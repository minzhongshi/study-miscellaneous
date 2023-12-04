/**
 * string & xxx :类型约束只能是字符串
 * K extends keyof T & string: K只能是T中的字段，并且只能是字符串
 */

type Watcher<T> = {
    on<K extends keyof T & string>(
        eventName: `${K}Changed`,
        callback: (oldValue: T[K], newValue: T[K]) => void
    ):void;
} ;


declare function watch<T>(obj: T):Watcher<T>;

const personWatcher = watch({
    firstName: 'san',
    lastName: 'zhang',
    age: 18
});

personWatcher.on(
    'ageChanged',
    (oldValue, newValue) => {

    }
);