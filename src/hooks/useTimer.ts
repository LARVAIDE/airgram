import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat'
dayjs.extend(advancedFormat)

const useTimer = (timer: string, duration: number) => {
    return [`${dayjs(timer).format('HH:mm a')} - ${dayjs(new Date(new Date(timer).getTime()+duration*1000)).format('HH:mm a')}`]
}

export default useTimer