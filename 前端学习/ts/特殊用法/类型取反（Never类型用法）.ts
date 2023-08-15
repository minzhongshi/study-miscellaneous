/**
 * 类型排除，其约束将某种剔除
 * never: 不存在
 * T: 传入参数类型
 * K：需要排除的类型
 */

type BandType<T,K> = T extends K ? never : T
function f<T>(x:BandType<T, number>) {}