/* @internal */
namespace ts {
    /** Create a MapLike with good performance. */
    function createDictionaryObject<T>(): Record<string, T> {
        const map = Object.create(/*prototype*/ null); // eslint-disable-line no-null/no-null

        // Using 'delete' on an object causes V8 to put the object in dictionary mode.
        // This disables creation of hidden classes, which are expensive when an object is
        // constantly changing shape.
        map.__ = undefined;
        delete map.__;
        return map;
    }

    // NOTE: Due to how the project-reference merging ends up working, `K` and `V` aren't considered referenced until `ESMap` merges with the definition
    // in src/compiler/core.ts
    // @ts-ignore
    export interface ESMap<K, V> {
        // Forward declaration - full type defined in ~/src/compiler/core.ts
    }

    // NOTE: Due to how the project-reference merging ends up working, `T` isn't considered referenced until `Set` merges with the definition
    // in src/compiler/core.ts
    // @ts-ignore
    export interface Set<T> {
        // Forward declaration - full type defined in ~/src/compiler/core.ts
    }

    // NOTE: Due to how the project-reference merging ends up working, `K` and `V` aren't considered referenced until `WeakMap` merges with the definition
    // in src/compiler/core.ts
    // @ts-ignore
    export interface WeakMap<K extends object, V> {
    }

    // NOTE: Due to how the project-reference merging ends up working, `T` isn't considered referenced until `WeakSet` merges with the definition
    // in src/compiler/core.ts
    // @ts-ignore
    export interface WeakSet<T extends object> {
        // Forward declaration - full type defined in ~/src/compiler/core.ts
    }


    interface MapData<K, V> {
        _strings?: Record<string, MapEntry<K, V>>;
        _numbers?: MapEntry<K, V>[];
        _true?: MapEntry<K, V>;
        _false?: MapEntry<K, V>;
        _null?: MapEntry<K, V>;
        _undefined?: MapEntry<K, V>;
        _objects?: MapEntry<K, V>;
    }

    interface MapIterationData<K, V> {
        // Linked list references for iterators.
        // See https://github.com/Microsoft/TypeScript/pull/27292
        // for more information.

        /**
         * The first entry in the linked list.
         * Note that this is only a stub that serves as starting point
         * for iterators and doesn't contain a key and a value.
         */
        readonly _firstIterationEntry: MapEntry<K, V>;
        _lastIterationEntry: MapEntry<K, V>;
    }

    interface MapEntry<K, V> {
        readonly key?: K;
        value?: V;

        // Linked list references for object-based keys
        next?: MapEntry<K, V>;

        // Linked list references for iterators.
        nextIterationEntry?: MapEntry<K, V>;
        previousIterationEntry?: MapEntry<K, V>;

        /**
         * Specifies if iterators should skip the next entry.
         * This will be set when an entry is deleted.
         * See https://github.com/Microsoft/TypeScript/pull/27292 for more information.
         */
        skipNextIteration?: boolean;
    }

    interface CollectionHelpers {
        createIterator(): new <K, V, U extends (K | V | [K, V])>(currentEntry: MapEntry<K, V>, selector: (key: K, value: V) => U) => Iterator<U>;
        hasEntry<K, V>(data: MapData<K, V>, key: K): boolean;
        getEntry<K, V>(data: MapData<K, V>, key: K): MapEntry<K, V> | undefined;
        getObjectEntry<K extends object, V>(data: MapData<K, V>, key: K): MapEntry<K, V> | undefined;
        addOrUpdateEntry<K, V>(data: MapData<K, V>, key: K, value: V): MapEntry<K, V> | undefined;
        addOrUpdateObjectEntry<K extends object, V>(data: MapData<K, V>, key: K, value: V): MapEntry<K, V> | undefined;
        deleteEntry<K, V>(data: MapData<K, V>, key: K): MapEntry<K, V> | undefined;
        deleteObjectEntry<K extends object, V>(data: MapData<K, V>, key: K): MapEntry<K, V> | undefined;
        clearEntries<K, V>(data: MapData<K, V>): void;
        clearObjectEntries<K extends object, V>(data: MapData<K, V>): void;
        addToIteration<K, V>(data: MapIterationData<K, V>, entry: MapEntry<K, V>): void;
        removeFromIteration<K, V>(data: MapIterationData<K, V>, entry: MapEntry<K, V>): void;
        removeAllFromIteration<K, V>(data: MapIterationData<K, V>): void;
    }

    // lazily evaluate helpers used for both Map and Set
    let collectionHelpers = () => {
        const helpers: CollectionHelpers = {
            createIterator,
            hasEntry,
            getEntry,
            getObjectEntry,
            addOrUpdateEntry,
            addOrUpdateObjectEntry,
            deleteEntry,
            deleteObjectEntry,
            clearEntries,
            clearObjectEntries,
            addToIteration,
            removeFromIteration,
            removeAllFromIteration,
        };

        collectionHelpers = () => helpers;
        return helpers;

        function createIterator() {
            return class <K, V, U extends (K | V | [K, V])> {
                private currentEntry?: MapEntry<K, V>;
                private selector: (key: K, value: V) => U;

                constructor(currentEntry: MapEntry<K, V>, selector: (key: K, value: V) => U) {
                    this.currentEntry = currentEntry;
                    this.selector = selector;
                }

                public next(): { value: U, done: false } | { value: never, done: true } {
                    // Navigate to the next entry.
                    while (this.currentEntry) {
                        const skipNext = !!this.currentEntry.skipNextIteration;
                        this.currentEntry = this.currentEntry.nextIterationEntry;

                        if (!skipNext) {
                            break;
                        }
                    }

                    if (this.currentEntry) {
                        return { value: this.selector(this.currentEntry.key!, this.currentEntry.value!), done: false };
                    }
                    else {
                        return { value: undefined as never, done: true };
                    }
                }
            };
        }

        function hasEntry<K, V>(data: MapData<K, V>, key: K): boolean {
            /* eslint-disable no-in-operator, no-null/no-null */
            return typeof key === "string" ? !!data._strings && key in data._strings :
                typeof key === "number" ? !!data._numbers && key in data._numbers :
                typeof key === "boolean" ? key ? !!data._true : !!data._false :
                key === null ? !!data._null :
                key === undefined ? !!data._undefined :
                !!getObjectEntry(data, key);
            // eslint-enable no-in-operator, no-null/no-null
        }

        function getEntry<K, V>(data: MapData<K, V>, key: K): MapEntry<K, V> | undefined {
            /* eslint-disable no-null/no-null */
            return typeof key === "string" ? data._strings && data._strings[key] :
                typeof key === "number" ? data._numbers && data._numbers[key] :
                typeof key === "boolean" ? key ? data._true : data._false :
                key === undefined ? data._undefined :
                key === null ? data._null :
                getObjectEntry(data, key);
            /* eslint-enable no-null/no-null */
        }

        function getObjectEntry<K, V>(data: MapData<K, V>, key: K): MapEntry<K, V> | undefined {
            for (let node = data._objects; node; node = node.next) {
                if (node.key === key) {
                    return node;
                }
            }
        }

        function addOrUpdateEntry<K, V>(data: MapData<K, V>, key: K, value: V): MapEntry<K, V> | undefined {
            if (typeof key === "string") {
                if (!data._strings) data._strings = createDictionaryObject();
                if (!data._strings[key]) return data._strings[key] = { key, value };
                data._strings[key].value = value;
            }
            else if (typeof key === "number") {
                if (!data._numbers) data._numbers = [];
                if (!data._numbers[key]) return data._numbers[key] = { key, value };
                data._numbers[key].value = value;
            }
            else {
                /* eslint-disable no-null/no-null */
                const prop = typeof key === "boolean" ? key ? "_true" : "_false" :
                    key === null ? "_null" :
                    key === undefined ? "_undefined" :
                    undefined;
                /* eslint-enable no-null/no-null */
                if (prop) {
                    if (!data[prop]) return data[prop] = { key, value };
                    data[prop]!.value = value;
                }
                else {
                    return addOrUpdateObjectEntry(data, key, value);
                }
            }
        }

        function addOrUpdateObjectEntry<K, V>(data: MapData<K, V>, key: K, value: V): MapEntry<K, V> | undefined {
            if (!data._objects) return data._objects = { key, value, next: undefined };
            const existing = getObjectEntry(data, key);
            if (!existing) return data._objects = { key, value, next: data._objects };
            existing.value = value;
        }

        function deleteEntry<K, V>(data: MapData<K, V>, key: K): MapEntry<K, V> | undefined {
            if (typeof key === "string") {
                if (data._strings) {
                    const entry = data._strings[key];
                    if (entry) {
                        delete data._strings[key];
                        return entry;
                    }
                }
            }
            else if (typeof key === "number") {
                if (data._numbers) {
                    const entry = data._numbers[key];
                    if (entry) {
                        delete data._numbers[key];
                        return entry;
                    }
                }
            }
            else {
                /* eslint-disable no-null/no-null */
                const prop = typeof key === "boolean" ? key ? "_true" : "_false" :
                    key === null ? "_null" :
                    key === undefined ? "_undefined" :
                    undefined;
                /* eslint-enable no-null/no-null */
                if (prop) {
                    const entry = data[prop];
                    if (entry) {
                        data[prop] = undefined;
                        return entry;
                    }
                }
                else {
                    return deleteObjectEntry(data, key);
                }
            }
        }

        function deleteObjectEntry<K, V>(data: MapData<K, V>, key: K): MapEntry<K, V> | undefined {
            let prev: MapEntry<K, V> | undefined;
            for (let node = data._objects; node; prev = node, node = node.next) {
                if (node.key === key) {
                    if (prev) {
                        prev.next = node.next;
                    }
                    else {
                        data._objects = node.next;
                    }
                    node.next = undefined;
                    return node;
                }
            }
        }

        function clearEntries<K, V>(data: MapData<K, V>) {
            if (data._strings) data._strings = undefined;
            if (data._numbers) data._numbers = undefined;
            if (data._true) data._true = undefined;
            if (data._false) data._false = undefined;
            if (data._null) data._null = undefined;
            if (data._undefined) data._undefined = undefined;
            clearObjectEntries(data);
        }

        function clearObjectEntries<K, V>(data: MapData<K, V>) {
            if (data._objects) {
                let node = data._objects;
                data._objects = undefined;
                while (node) {
                    const next = node.next!;
                    node.next = undefined;
                    node = next;
                }
            }
        }

        function addToIteration<K, V>(data: MapIterationData<K, V>, newEntry: MapEntry<K, V>) {
            // Adjust the references.
            const previousLastEntry = data._lastIterationEntry;
            previousLastEntry.nextIterationEntry = newEntry;
            newEntry.previousIterationEntry = previousLastEntry;
            data._lastIterationEntry = newEntry;
        }

        function removeFromIteration<K, V>(data: MapIterationData<K, V>, entry: MapEntry<K, V>) {
            // Adjust the linked list references of the neighbor entries.
            const previousEntry = entry.previousIterationEntry!;
            previousEntry.nextIterationEntry = entry.nextIterationEntry;
            if (entry.nextIterationEntry) {
                entry.nextIterationEntry.previousIterationEntry = previousEntry;
            }

            // When the deleted entry was the last one, we need to
            // adjust the lastEntry reference.
            if (data._lastIterationEntry === entry) {
                data._lastIterationEntry = previousEntry;
            }

            // Adjust the forward reference of the deleted entry
            // in case an iterator still references it. This allows us
            // to throw away the entry, but when an active iterator
            // (which points to the current entry) continues, it will
            // navigate to the entry that originally came before the
            // current one and skip it.
            entry.previousIterationEntry = undefined;
            entry.nextIterationEntry = previousEntry;
            entry.skipNextIteration = true;
        }

        function removeAllFromIteration<K, V>(data: MapIterationData<K, V>) {
            // Reset the linked list. Note that we must adjust the forward
            // references of the deleted entries to ensure iterators stuck
            // in the middle of the list don't continue with deleted entries,
            // but can continue with new entries added after the clear()
            // operation.
            const firstEntry = data._firstIterationEntry;
            let currentEntry = firstEntry.nextIterationEntry;
            while (currentEntry) {
                const nextEntry = currentEntry.nextIterationEntry;
                currentEntry.previousIterationEntry = undefined;
                currentEntry.nextIterationEntry = firstEntry;
                currentEntry.skipNextIteration = true;
                currentEntry = nextEntry;
            }

            firstEntry.nextIterationEntry = undefined;
            data._lastIterationEntry = firstEntry;
        }
    };

    /* @internal */
    export function createMapShim(): new <K, V>() => ESMap<K, V> {
        const helpers = collectionHelpers();
        const MapIterator = helpers.createIterator();
        return class <K, V> implements ESMap<K, V> {
            public size = 0;

            /* private */ _strings?: Record<string, MapEntry<K, V>>;
            /* private */ _numbers?: MapEntry<K, V>[];
            /* private */ _true?: MapEntry<K, V>;
            /* private */ _false?: MapEntry<K, V>;
            /* private */ _null?: MapEntry<K, V>;
            /* private */ _undefined?: MapEntry<K, V>;
            /* private */ _objects?: MapEntry<K, V>;
            /* private */ readonly _firstIterationEntry: MapEntry<K, V>;
            /* private */ _lastIterationEntry: MapEntry<K, V>;

            constructor() {
                // Create a first (stub) map entry that will not contain a key
                // and value but serves as starting point for iterators.
                this._firstIterationEntry = {};
                // When the map is empty, the last entry is the same as the
                // first one.
                this._lastIterationEntry = this._firstIterationEntry;
            }

            get(key: K): V | undefined {
                return helpers.getEntry(this, key)?.value;
            }

            set(key: K, value: V): this {
                const newEntry = helpers.addOrUpdateEntry(this, key, value);
                if (newEntry) {
                    this.size++;
                    helpers.addToIteration(this, newEntry);
                }
                return this;
            }

            has(key: K): boolean {
                return helpers.hasEntry(this, key);
            }

            delete(key: K): boolean {
                const entry = helpers.deleteEntry(this, key);
                if (entry) {
                    this.size--;
                    helpers.removeFromIteration(this, entry);
                    return true;
                }
                return false;
            }

            clear(): void {
                helpers.clearEntries(this);
                this.size = 0;
                helpers.removeAllFromIteration(this);
            }

            keys(): Iterator<K> {
                return new MapIterator(this._firstIterationEntry, key => key);
            }

            values(): Iterator<V> {
                return new MapIterator(this._firstIterationEntry, (_key, value) => value);
            }

            entries(): Iterator<[K, V]> {
                return new MapIterator(this._firstIterationEntry, (key, value) => [key, value] as [K, V]);
            }

            forEach(action: (value: V, key: K) => void): void {
                const iterator = this.entries();
                while (true) {
                    const iterResult = iterator.next();
                    if (iterResult.done) {
                        break;
                    }

                    const [key, value] = iterResult.value;
                    action(value, key);
                }
            }
        };
    }

    /* @internal */
    export function createSetShim(): new <T>() => Set<T> {
        const helpers = collectionHelpers();
        const SetIterator = helpers.createIterator();
        return class <T> implements Set<T> {
            public size = 0;

            /* private */ _strings?: Record<string, MapEntry<T, T>>;
            /* private */ _numbers?: MapEntry<T, T>[];
            /* private */ _true?: MapEntry<T, T>;
            /* private */ _false?: MapEntry<T, T>;
            /* private */ _null?: MapEntry<T, T>;
            /* private */ _undefined?: MapEntry<T, T>;
            /* private */ _objects?: MapEntry<T, T>;
            /* private */ readonly _firstIterationEntry: MapEntry<T, T>;
            /* private */ _lastIterationEntry: MapEntry<T, T>;

            constructor() {
                // Create a first (stub) map entry that will not contain a key
                // and value but serves as starting point for iterators.
                this._firstIterationEntry = {};
                // When the map is empty, the last entry is the same as the
                // first one.
                this._lastIterationEntry = this._firstIterationEntry;
            }

            add(value: T): this {
                const newEntry = helpers.addOrUpdateEntry(this, value, value);
                if (newEntry) {
                    this.size++;
                    helpers.addToIteration(this, newEntry);
                }
                return this;
            }

            has(value: T): boolean {
                return helpers.hasEntry(this, value);
            }

            delete(value: T): boolean {
                const entry = helpers.deleteEntry(this, value);
                if (entry) {
                    this.size--;
                    helpers.removeFromIteration(this, entry);
                    return true;
                }
                return false;
            }

            clear(): void {
                helpers.clearEntries(this);
                this.size = 0;
                helpers.removeAllFromIteration(this);
            }

            keys(): Iterator<T> {
                return new SetIterator(this._firstIterationEntry, key => key);
            }

            values(): Iterator<T> {
                return new SetIterator(this._firstIterationEntry, key => key);
            }

            entries(): Iterator<[T, T]> {
                return new SetIterator(this._firstIterationEntry, key => [key, key] as [T, T]);
            }

            forEach(action: (value: T, key: T) => void): void {
                const iterator = this.entries();
                while (true) {
                    const iterResult = iterator.next();
                    if (iterResult.done) {
                        break;
                    }

                    const [key, value] = iterResult.value;
                    action(value, key);
                }
            }
        };
    }

    // NOTE: Not a real WeakMap, this implementation will hold onto references until it is GC'ed. However, it's the best
    // we can do without storing data on each value itself.
    /* @internal */
    export function createWeakMapShim(): new <K extends object, V>() => WeakMap<K, V> {
        const helpers = collectionHelpers();
        return class <K extends object, V> implements WeakMap<K, V> {
            /* private */ _objects?: MapEntry<K, V>;

            get(key: K): V | undefined {
                // eslint-disable-next-line no-null/no-null
                if (typeof key !== "object" || key === null) throw new TypeError("Invalid value used as weak map key");
                return helpers.getObjectEntry(this, key)?.value;
            }

            set(key: K, value: V): this {
                // eslint-disable-next-line no-null/no-null
                if (typeof key !== "object" || key === null) throw new TypeError("Invalid value used as weak map key");
                helpers.addOrUpdateObjectEntry(this, key, value);
                return this;
            }

            has(key: K): boolean {
                // eslint-disable-next-line no-null/no-null
                if (typeof key !== "object" || key === null) throw new TypeError("Invalid value used as weak map key");
                return !!helpers.getObjectEntry(this, key);
            }

            delete(key: K): boolean {
                // eslint-disable-next-line no-null/no-null
                if (typeof key !== "object" || key === null) throw new TypeError("Invalid value used as weak map key");
                return !!helpers.deleteObjectEntry(this, key);
            }
        };
    }

    // NOTE: Not a real WeakSet, this implementation will hold onto references until it is GC'ed. However, it's the best
    // we can do without storing data on each value itself.
    /* @internal */
    export function createWeakSetShim(): new <T extends object>() => WeakSet<T> {
        const helpers = collectionHelpers();
        return class <T extends object> implements WeakSet<T> {
            /* private */ _objects?: MapEntry<T, T>;

            add(value: T): this {
                // eslint-disable-next-line no-null/no-null
                if (typeof value !== "object" || value === null) throw new TypeError("Invalid value used in weak set");
                helpers.addOrUpdateObjectEntry(this, value, value);
                return this;
            }

            has(value: T): boolean {
                // eslint-disable-next-line no-null/no-null
                if (typeof value !== "object" || value === null) throw new TypeError("Invalid value used in weak set");
                return !!helpers.getObjectEntry(this, value);
            }

            delete(value: T): boolean {
                // eslint-disable-next-line no-null/no-null
                if (typeof value !== "object" || value === null) throw new TypeError("Invalid value used in weak set");
                return !!helpers.deleteObjectEntry(this, value);
            }
        };
    }
}