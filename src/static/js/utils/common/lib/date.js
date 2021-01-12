// 将时间控件的选中结果记住,能处理近7日、近30日、自然周、自然月、自定义
import { setSessionStorage, getSessionStorage } from './storage';
import { isArray, isEmptyObject, isObject } from './is';


/**
 *
 * 返回最近一个完整周的起始日期（如果date是周日，本周不可选）
 * @param {*} [date=new Date()]
 * @returns
 */
export const getWeekRangeDate = (date = new Date()) => {
    const time = date.getTime();
    const week = date.getDay();
    const addDigit = num => {
        if (num < 10) {
            return `0${num}`;
        }
        return num;
    };
    const step = week === 0 ? 7 : week;
    const endDate = new Date(time - step * 24 * 60 * 60 * 1000);
    const startDate = new Date(time - (step + 6) * 24 * 60 * 60 * 1000);
    return {
        startDate: `${startDate.getFullYear()}-${addDigit(startDate.getMonth() + 1)}-${addDigit(startDate.getDate())}`,
        endDate: `${endDate.getFullYear()}-${addDigit(endDate.getMonth() + 1)}-${addDigit(endDate.getDate())}`,
        startTime: startDate.getTime(),
        endTime: endDate.getTime()
    };
};


// 只负责修改defaultStartDate、defaultEndDate、isInit
export const datePickConfiger = function (key) {
    return {
        // dateParams是时间控件datepcikerChangeHandler回调的全部参数，转换成数组
        save(dateParams) {
            // 将选中的时间存在sessionStorage中
            const value = {};
            const type = dateParams && dateParams[1] && dateParams[1].dateType;
            if (Number(type) === 7) {
                value.code = '7';
            } else if (Number(type) === 30) {
                value.code = '30';
            } else if (type === 'week' || type === 'month' || type === 'dayRange' || type === 'day') {
                value.code = type;
                value.defaultStartDate = dateParams[0].startDate;
                value.defaultEndDate = dateParams[0].endDate;
            }
            setSessionStorage(key, value);
        },
        // 恢复上一次的设置,datePickerConfig是GracePackDatePicker的config字段,会修改datePickerConfig，无法返回值
        recover(datePickerConfig) {
            // 从sessionStorage中获取上次的时间值，并修改时间控件的配置，修改默认值
            let value = getSessionStorage(key);
            const maxTime = datePickerConfig.maxDate ? (new Date(datePickerConfig.maxDate)).getTime() : undefined;
            const minTime = datePickerConfig.minDate ? (new Date(datePickerConfig.minDate)).getTime() : undefined;
            if (value && datePickerConfig && isArray(datePickerConfig.items) && datePickerConfig.items.length) {
                // 根据记忆的时间设定默认值
                value = JSON.parse(value);
                let isFind = false;
                if (isObject(value) && !isEmptyObject(value)) {
                    datePickerConfig.items.forEach(cf => {
                        if (String(cf.code) === String(value.code)) {
                            cf.isInit = true;
                            isFind = true;
                            if (cf.code === 'week' || cf.code === 'month' || cf.code === 'dayRange' || cf.code === 'day') {
                                if (maxTime && minTime) {
                                    // 如果设置了max和min，那么只有当max和min完全cover住值的时候才用上次的值，否则不设置默认值，走组件的默认值
                                    if ((new Date(value.defaultStartDate)).getTime() >= minTime && (new Date(value.defaultEndDate)).getTime() <= maxTime) {
                                        cf.defaultStartDate = value.defaultStartDate;
                                        cf.defaultEndDate = value.defaultEndDate;
                                    } else {
                                        // 对于非自然周，直接删掉默认时间，采用时间控件的默认时间即可。自然周不能没有默认时间，所以下面特殊处理
                                        delete cf.defaultStartDate;
                                        delete cf.defaultEndDate;
                                        if (cf.code === 'week') {
                                            // 如果是自然周，不设置默认时间控件会报错，兼容之
                                            const defaultWeek = getWeekRangeDate();
                                            if (defaultWeek.startTime >= minTime && defaultWeek.endTime <= maxTime) {
                                                // 如果默认近一周是合法的，则用默认近一周，否则重置
                                                cf.defaultStartDate = defaultWeek.startDate;
                                                cf.defaultEndDate = defaultWeek.endDate;
                                            } else {
                                                cf.isInit = false;
                                                isFind = false;
                                            }
                                        } else {
                                            // 其它情况按照默认第一个来处理
                                            cf.isInit = false;
                                            isFind = false;
                                        }
                                    }
                                } else if (minTime) {
                                    // 如果只设置了最小时间，且记忆时间在有效范围内，则设置其为默认时间
                                    if ((new Date(value.defaultStartDate)).getTime() >= minTime) {
                                        cf.defaultStartDate = value.defaultStartDate;
                                        cf.defaultEndDate = value.defaultEndDate;
                                    } else {
                                        // 对于非自然周，直接删掉默认时间，采用时间控件的默认时间即可。自然周不能没有默认时间，所以下面特殊处理
                                        delete cf.defaultStartDate;
                                        delete cf.defaultEndDate;
                                        if (cf.code === 'week') {
                                            // 如果是自然周，不设置默认时间控件会报错，兼容之
                                            const defaultWeek = getWeekRangeDate();
                                            if (defaultWeek.startTime >= minTime) {
                                                // 如果默认近一周是合法的，则用默认近一周，否则重置
                                                cf.defaultStartDate = defaultWeek.startDate;
                                                cf.defaultEndDate = defaultWeek.endDate;
                                            } else {
                                                cf.isInit = false;
                                                isFind = false;
                                            }
                                        } else {
                                            // 其它情况按照默认第一个来处理
                                            cf.isInit = false;
                                            isFind = false;
                                        }
                                    }
                                } else {
                                    cf.defaultStartDate = value.defaultStartDate;
                                    cf.defaultEndDate = value.defaultEndDate;
                                }
                            }
                        } else {
                            // 非当前值无关配置删除之
                            delete cf.isInit;
                            delete cf.defaultStartDate;
                            delete cf.defaultEndDate;
                        }
                    });
                }
                if (!isFind) {
                    // 如果没有匹配的，则默认用第一个
                    datePickerConfig.items[0].isInit = true;
                }
            }
        }
    };
};

/**
 * 获取当前日期前n天的单日期
 * @param {*} date
 * @param {*} n
 */
export const previousDay = function (date = new Date(), n = 1) {
    const d = new Date(date.getTime() - (n * 24 * 60 * 60 * 1000));
    const month = d.getMonth() + 1 < 10 ? `0${d.getMonth() + 1}` : d.getMonth() + 1;
    const dd = d.getDate() < 10 ? `0${d.getDate()}` : d.getDate();
    // 注意，这里返回的，格式一定是2018-09-01，而不是2018-9-1，后者在ie浏览器上不支持new Date('2018-9-1')
    return `${d.getFullYear()}-${month}-${dd}`;
};

