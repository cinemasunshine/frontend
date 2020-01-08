import { factory } from '@cinerino/api-javascript-client';
import { IMovie, ISchedule, Performance } from '../models';

/**
 * 券種金額取得
 */
export function getTicketPrice(offer: any) {
    const ticketInfo = offer.ticketInfo;
    // const spseatAdd1 = (ticketInfo.spseatAdd1 === undefined) ? 0 : ticketInfo.spseatAdd1;
    const spseatAdd2 = (ticketInfo.spseatAdd2 === undefined) ? 0 : ticketInfo.spseatAdd2;
    return (ticketInfo.salePrice + spseatAdd2);
}

/**
 * 4DX判定
 */
export function is4DX(screeningEvent?: factory.chevre.event.screeningEvent.IEvent) {
    if (screeningEvent === undefined
        || screeningEvent.superEvent.coaInfo === undefined
        || screeningEvent.superEvent.coaInfo.kbnJoueihousiki === undefined) {
        return false;
    }
    const code = screeningEvent.superEvent.coaInfo.kbnJoueihousiki.kubunCode;
    return (code === '002' || code === '004');
}

/**
 * スケジュールからパフォーマンスへ変換
 */
export function schedule2Performance(schedule: ISchedule, member: boolean) {
    const performances: Performance[] = [];
    const date = schedule.date;
    schedule.movie.forEach((movie) => {
        movie.screen.forEach((screen) => {
            screen.time.forEach((time) => {
                performances.push(new Performance({ date, movie, screen, time, member }));
            });
        });
    });
    return performances;
}

/**
 * パフォーマンスを作品で絞り込み
 */
export function filterPerformancebyMovie(
    performances: Performance[],
    movie: IMovie) {
    const filterResult =
        performances.filter(p => {
            return (p.movie.movie_short_code === movie.movie_short_code
                && p.movie.movie_branch_code === movie.movie_branch_code);
        });
    const sortResult = filterResult.sort((a, b) => {
        if (a.time.start_time < b.time.start_time) {
            return -1;
        } else {
            return 1;
        }
    });
    return sortResult;
}
