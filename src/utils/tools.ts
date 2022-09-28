/**
 * 
 * @param target 
 * @param type 
 * @returns 
 */
const whatType = (target: any, type: string): boolean => {
    return Object.prototype.toString.call(target) === `[object ${type}]` ? true : false
}
/**
 * 
 * @param target 
 * @returns 
 */
const isFn = (target: any): boolean => whatType(target, 'Function')
/**
 * 
 * @param target 
 * @returns 
 */
const isObj = (target: any): boolean => whatType(target, 'Object')
/**
 * 
 * @param index 
 * @returns 
 */
const getWeekDay = (index: number): string => {
    return ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][index]
}
/**
 * 
 * @param index 
 * 
 * @returns 
 */
const getMonth = (index: number): string => {
    return ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'][index]
}

export {
    whatType,
    isFn,
    isObj,
    getWeekDay,
    getMonth
}