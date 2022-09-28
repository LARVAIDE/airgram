import dayjs from 'dayjs';
import { getWeekDay, getMonth } from './tools'

export type dataType = {
    create_time: string,
    duration: number,
    id: string,
    title: string
}

/**
 * 
 * @param list_one 
 * @param list_two 
 * @returns 
 */
const dataGroup = (list_one: dataType[], list_two: dataType[]): any => {
    const tempGroup = new Map()
    const setValue = (list: dataType[]): void => {
        for (let item of list) {
            if (!item) continue
            const create_time = dayjs(item.create_time)
            const key = `${getWeekDay(create_time.day())},${getMonth(create_time.month())} ${create_time.date()}`;
            if (!tempGroup.get(key)) {
                tempGroup.set(key, [item])
            } else {
                tempGroup.set(key, tempGroup.get(key).concat(item))
            }
        }
    }
    setValue(list_one)
    setValue(list_two)
    return tempGroup
}

export default dataGroup