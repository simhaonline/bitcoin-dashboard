import moment from 'moment';

const resolutionToDuration = (resolution: string) => {
    const value = parseInt(resolution, 0) || 1;
    const unit = resolution.replace(value.toString(), '');

    let momentUnit: any = 'minutes';

    switch (unit) {
        default:
        case 'D':
            momentUnit = 'days';
            break;
        case 'M':
            momentUnit = 'months';
            break;
        case 'W':
            momentUnit = 'weeks';
            break;
    }

    let result: moment.Duration;

    try {
        result = moment.duration(value, momentUnit);
    } catch (exc) {
        result = null;
    }

    return result;
};

export default resolutionToDuration;
