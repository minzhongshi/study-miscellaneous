/**
 * Partial<T> 将T中的所有属性设置为可选
 *
 * type Partial<T> = {
 *     [P in kefof T]?: T[P]
 * }
 */

interface Person {
    name: string;
    age: number;
    location: string;
}

type PartialPerson = Partial<Person>;
// PartialPerson的类型为：
// type PartialPerson = {
//     name?: string | undefined;
//     age?: number | undefined;
//     location?: string | undefined;
// }
let p: PartialPerson = {
    name: 'san'
};

/**
 * Required<T> 将T中的所有属性设置为必选
 *
 * type Required<T> = {
 *     [P in keyof T]-?: T[P]
 * }
 */

type RequiredPerson = Required<PartialPerson>;
// RequiredPerson的类型为：
// type RequiredPerson = {
//     name: string;
//     age: number;
//     location: string;
// }

let rp: RequiredPerson = {
    name: 'san',
    age: 18,
    location: 'beijing'
};

/**
 * Readonly<T> 将T中的所有属性设置为只读
 *
 * type Readonly<T> = {
 *     readonly [P in keyof T]: T[P]
 * }
 */

type ReadonlyPerson = Readonly<Person>;
// ReadonlyPerson的类型为：
// type ReadonlyPerson = {
//     readonly name: string;
//     readonly age: number;
//     readonly location: string;
// }

let ro: ReadonlyPerson = {
    name: 'san',
    age: 18,
    location: 'beijing'
};
ro.name = 'si'; // Cannot assign to 'name' because it is a read-only property.

/**
 * Record<K,T> 将K中的所有属性的值转换为T类型
 *
 * type Record<K extends keyof any, T> = {
 *     [P in K]: T;
 * }
 */

type RecordPerson = Record<'name' | 'age', Person>;
// RecordPerson的类型为：
// type RecordPerson = {
//     name: Person;
//     age: Person;
// }

let r: RecordPerson = {
    name: {
        name: 'san',
        age: 18,
        location: 'beijing'
    },
    age: {
        name: 'si',
        age: 19,
        location: 'beijing'
    }
};

/**
 * Pick<T,K> 从T中选取K中的属性
 *
 * type Pick<T, K extends keyof T> = {
 *     [P in K]: T[P];
 * }
 */

type PickPerson = Pick<Person, 'name' | 'age'>;
// PickPerson的类型为：
// type PickPerson = {
//     name: string;
//     age: number;
// }

let p2: PickPerson = {
    name: 'san',
    age: 18
};

/**
 * Exclude<T,U> 从T中排除U
 *
 * type Exclude<T, U> = T extends U ? never : T;
 */

type ExcludePerson = Exclude<Person, { age: number }>;
// ExcludePerson的类型为：
// type ExcludePerson = {
//     name: string;
//     location: string;
// }

let ep: ExcludePerson = {
    name: 'san',
    location: 'beijing'
};

/**
 * Extract<T,U> 从T中提取U
 *
 * type Extract<T, U> = T extends U ? T : never;
 */

type ExtractPerson = Extract<Person, { age: number }>;
// ExtractPerson的类型为：
// type ExtractPerson = {
//     name: string;
//     age: number;
//     location: string;
// }

let ep2: ExtractPerson = {
    name: 'san',
    age: 18,
    location: 'beijing'
};

/**
 * NonNullable<T> 从T中排除null和undefined
 *
 * type NonNullable<T> = T extends null | undefined ? never : T;
 */

type NonNullablePerson = NonNullable<Person | null | undefined>;
// NonNullablePerson的类型为：
// type NonNullablePerson = {
//     name: string;
//     age: number;
//     location: string;
// }


/**
 * Omit<T,K> 从T中排除K中的属性
 *
 * type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;
 */

type OmitPerson = Omit<Person, 'name' | 'age'>;
// OmitPerson的类型为：
// type OmitPerson = {
//     location: string;
// }

let op: OmitPerson = {
    location: 'beijing'
};

/**
 * ReturnType<T> 获取函数返回值的类型
 *
 * type ReturnType<T extends (...args: any) => any> = T extends (...args: any) => infer R ? R : any;
 */

type ReturnTypePerson = ReturnType<() => Person>;
// ReturnTypePerson的类型为：
// type ReturnTypePerson = Person

let rtp: ReturnTypePerson = {
    name: 'san',
    age: 18,
    location: 'beijing'
};

/**
 * InstanceType<T> 获取构造函数类型的实例类型
 *
 * type InstanceType<T extends new (...args: any) => any> = T extends new (...args: any) => infer R ? R : any;
 */

type InstanceTypePerson = InstanceType<typeof Person>;
// InstanceTypePerson的类型为：
// type InstanceTypePerson = Person


/**
 * Parameters<T> 获取函数参数的类型
 *
 * type Parameters<T extends (...args: any) => any> = T extends (...args: infer P) => any ? P : never;
 */

type ParametersPerson = Parameters<(name: string, age: number) => Person>;
// ParametersPerson的类型为：
// type ParametersPerson = [string, number]
