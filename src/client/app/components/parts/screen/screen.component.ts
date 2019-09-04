import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output } from '@angular/core';
import * as COA from '@motionpicture/coa-service';
import 'rxjs/add/operator/toPromise';
import { isLowerCase, toFullWidth } from '../../../functions';
import { ILabel, IObject, IScreenConfig, ISeat } from '../../../models';
import { PurchaseService } from '../../../services';

type IStateReserveSeatResult = COA.services.reserve.IStateReserveSeatResult;
type IScreenResult = COA.services.master.IScreenResult;

@Component({
    selector: 'app-screen',
    templateUrl: './screen.component.html',
    styleUrls: ['./screen.component.scss']
})
export class ScreenComponent implements OnInit, AfterViewInit {
    public static ZOOM_SCALE = 1;
    @Input() public screenConfig: IScreenConfig;
    @Input() public status: IStateReserveSeatResult;
    @Input() public screen?: IScreenResult;
    @Output() public select = new EventEmitter<ISeat[]>();
    @Output() public alert = new EventEmitter();
    public data: IData;
    public zoomState: boolean;
    public scale: number;
    public height: number;
    public origin: string;

    constructor(
        private elementRef: ElementRef,
        private purchase: PurchaseService
    ) { }

    /**
     * 初期化
     */
    public ngOnInit() {
        this.zoomState = false;
        this.scale = 1;
        this.height = 0;
        this.origin = '0 0';
        this.data = this.createScreen();
    }

    /**
     * レンダリング後処理
     */
    public ngAfterViewInit() {
        const time = 300;
        const timer = setInterval(() => {
            if (this.data !== undefined) {
                clearInterval(timer);
                const screenElement = document.querySelector('.screen-style');
                if (screenElement !== null && this.data.screenConfig.style !== undefined) {
                    screenElement.innerHTML = this.data.screenConfig.style;
                }
                this.scaleDown();
                this.select.emit(this.getSelectSeats());
            }
        }, time);
    }

    /**
     * モバイル判定
     * @method isMobile
     * @returns {boolean}
     */
    public isMobile(): boolean {
        if (window.innerWidth > 768) {
            return false;
        }

        return true;
    }

    /**
     * 選択座席取得
     * @method getSelectSeats
     * @returns {Iseat[]}
     */
    public getSelectSeats(): ISeat[] {
        return this.data.seats.filter((seat) => {
            return (seat.status === 'active');
        });
    }

    /**
     * 座席選択
     * @method seatSelect
     * @param {Event} event
     * @param {Iseat} seat
     */
    public seatSelect(seat: ISeat) {
        if (this.isMobile() && !this.zoomState) {
            return;
        }
        const screeningEvent = this.purchase.data.screeningEvent;
        if (seat.status === 'default') {
            seat.status = 'active';
        } else if (seat.status === 'active') {
            seat.status = 'default';
        }

        if (screeningEvent === undefined
            || screeningEvent.coaInfo === undefined
            || screeningEvent.coaInfo.availableNum < this.getSelectSeats().length) {
            seat.status = 'default';
            this.alert.emit();

            return;
        }
        this.select.emit(this.getSelectSeats());
    }

    /**
     * 拡大
     * @method scaleUp
     * @param {Event} event
     * @returns {void}
     */
    public scaleUp(event: MouseEvent) {
        if (this.zoomState) {
            return;
        }
        if (!this.isMobile()) {
            return;
        }
        this.zoomState = true;
        const element: HTMLElement = this.elementRef.nativeElement;
        const screen = <HTMLDivElement>element.querySelector('.screen');
        const scroll = <HTMLDivElement>element.querySelector('.screen-scroll');
        const rect = scroll.getBoundingClientRect();
        const scrollTop = window.pageYOffset || (<HTMLElement>document.documentElement).scrollTop;
        const scrollLeft = window.pageXOffset || (<HTMLElement>document.documentElement).scrollLeft;
        const offset = {
            top: rect.top + scrollTop,
            left: rect.left + scrollLeft
        };
        const pos = {
            x: event.pageX - offset.left,
            y: event.pageY - offset.top
        };
        const scrollPos = {
            x: pos.x / this.scale - screen.offsetWidth / 2,
            y: pos.y / this.scale - screen.offsetHeight / 2,
        };
        this.scale = ScreenComponent.ZOOM_SCALE;
        this.origin = '50% 50%';

        setTimeout(() => {
            scroll.scrollLeft = scrollPos.x;
            scroll.scrollTop = scrollPos.y;
        }, 0);
    }

    /**
     * 縮小
     * @method scaleDown
     * @returns {void}
     */
    public scaleDown(): void {
        const element: HTMLElement = this.elementRef.nativeElement;
        const screen = <HTMLDivElement>element.querySelector('.screen');
        this.zoomState = false;
        const scale = screen.offsetWidth / this.data.screenConfig.size.w;
        this.scale = (scale > ScreenComponent.ZOOM_SCALE) ? ScreenComponent.ZOOM_SCALE : scale;
        this.height = this.data.screenConfig.size.h * this.scale;
        this.origin = '0 0';
    }

    /**
     * リサイズ処理
     * @method resize
     */
    public resize(): void {
        this.scaleDown();
    }

    /**
     * スクリーン作成
     */
    public createScreen() {
        // console.log(this.screenConfig, this.status, this.screen);
        const screenConfig = this.screenConfig;
        const seatStatus = this.status;
        const screen = this.screen;
        // y軸ラベル
        const lowerCase = (
            screen !== undefined
            && (isLowerCase(screen.listSeat[0].seatNum[0])
            || isLowerCase(screen.listSeat[screen.listSeat.length - 1].seatNum[0])));
        const labels = lowerCase
            ? 'abcdefghijklmnopqrstuvwxyz'.split('') : 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

        // 行ラベル
        const lineLabels: ILabel[] = [];
        // 列ラベル
        const columnLabels: ILabel[] = [];
        // 座席リスト
        const seats: ISeat[] = [];

        const pos = { x: 0, y: 0 };
        let labelCount = 0;
        for (let y = 0; y < screenConfig.map.length; y++) {
            if (y === 0) {
                pos.y = 0;
            }
            // ポジション設定
            if (y === 0) {
                pos.y += screenConfig.seatStart.y;
            } else if (screenConfig.map[y].length === 0) {
                pos.y += screenConfig.aisle.middle.h - screenConfig.seatMargin.h;
            } else {
                labelCount++;
                pos.y += screenConfig.seatSize.h + screenConfig.seatMargin.h;
            }

            for (let x = 0; x < screenConfig.map[y].length; x++) {
                if (x === 0) {
                    pos.x = screenConfig.seatStart.x;
                }

                // 座席ラベルHTML生成
                if (x === 0) {
                    lineLabels.push({
                        id: labelCount,
                        w: screenConfig.seatSize.w,
                        h: screenConfig.seatSize.h,
                        y: pos.y,
                        x: pos.x - screenConfig.seatLabelPos,
                        label: labels[labelCount]
                    });
                }

                if (screenConfig.map[y][x] === 8) {
                    pos.x += screenConfig.aisle.middle.w;
                } else if (screenConfig.map[y][x] === 9) {
                    pos.x += screenConfig.aisle.middle.w;
                } else if (screenConfig.map[y][x] === 10) {
                    pos.x += (screenConfig.seatSize.w / 2) + screenConfig.seatMargin.w;
                } else if (screenConfig.map[y][x] === 11) {
                    pos.x += (screenConfig.seatSize.w / 2) + screenConfig.seatMargin.w;
                }

                // 座席番号HTML生成
                if (y === 0) {

                    const label = (screenConfig.seatNumberAlign === 'left')
                        ? String(x + 1)
                        : String(screenConfig.map[0].length - x);
                    columnLabels.push({
                        id: x,
                        w: screenConfig.seatSize.w,
                        h: screenConfig.seatSize.h,
                        y: pos.y - screenConfig.seatNumberPos,
                        x: pos.x,
                        label: label
                    });

                }
                if (screenConfig.map[y][x] === 1
                    || screenConfig.map[y][x] === 4
                    || screenConfig.map[y][x] === 5
                    || screenConfig.map[y][x] === 8
                    || screenConfig.map[y][x] === 10) {
                    // 座席あり
                    // 座席HTML生成
                    const code = (screenConfig.seatNumberAlign === 'left')
                        ? `${toFullWidth(labels[labelCount])}－${toFullWidth(String(x + 1))}`
                        : `${toFullWidth(labels[labelCount])}－${toFullWidth(String(screenConfig.map[y].length - x))}`;
                    const label = (screenConfig.seatNumberAlign === 'left')
                        ? `${labels[labelCount]}${String(x + 1)}`
                        : `${labels[labelCount]}${String(screenConfig.map[y].length - x)}`;
                    const upperCaseLabel = label.toUpperCase();
                    const seatSize = { w: screenConfig.seatSize.w, h: screenConfig.seatSize.h };
                    const seatPosition = { x: pos.x, y: pos.y };
                    let className = `seat-${upperCaseLabel} seat-${upperCaseLabel.slice(0, 1)}`;
                    let section = '';
                    let status = 'disabled';
                    let seatType = 'standard';
                    const spseatAdd1 = 0;
                    const spseatAdd2 = 0;
                    const spseatKbn = '000';
                    for (const listSeat of seatStatus.listSeat) {
                        const targetSeat = listSeat.listFreeSeat.find((freeSeat) => {
                            return (freeSeat.seatNum === code);
                        });
                        if (targetSeat !== undefined) {
                            section = listSeat.seatSection;
                            status = 'default';
                            break;
                        }
                    }
                    // 選択中
                    if (this.purchase.data.tmpSeatReservationAuthorization !== undefined) {
                        const targetOffer = this.purchase.data.tmpSeatReservationAuthorization.object.acceptedOffer.find((offer) => {
                            return (offer.seatNumber === code);
                        });
                        if (targetOffer !== undefined) {
                            section = targetOffer.seatSection;
                            status = 'active';
                        }
                    }

                    if (screenConfig.hc.indexOf(upperCaseLabel) !== -1) {
                        // 車椅子
                        className += ' seat-hc';
                        seatType = 'hc';
                    }
                    screenConfig.specialSeats.forEach((specialSeat) => {
                        // 特別席
                        if (specialSeat.data.indexOf(upperCaseLabel) === -1) {
                            return;
                        }
                        const config = screenConfig.specialSeatConfig.find(c => c.name === specialSeat.name);
                        if (config === undefined) {
                            return;
                        }
                        className += ` ${config.className}`;
                        seatType = config.name;
                        seatSize.w = config.size.w;
                        seatSize.h = config.size.h;
                        seatPosition.y = pos.y - (config.size.h - screenConfig.seatSize.h);
                    });

                    const seat = {
                        className,
                        w: seatSize.w,
                        h: seatSize.h,
                        y: seatPosition.y,
                        x: seatPosition.x,
                        label,
                        status,
                        seatType,
                        coaInfo: {
                            seatNum: code,
                            section,
                            spseatAdd1,
                            spseatAdd2,
                            spseatKbn
                        }
                    };
                    seats.push(seat);
                    // x軸の座席の大きさによるズレを調整
                    screenConfig.specialSeats.forEach((specialSeat) => {
                        // 特別席
                        if (specialSeat.data.indexOf(upperCaseLabel) === -1) {
                            return;
                        }
                        const config = screenConfig.specialSeatConfig.find(c => c.name === specialSeat.name);
                        if (config === undefined) {
                            return;
                        }
                        pos.x += config.size.w - screenConfig.seatSize.w;
                    });
                }
                // ポジション設定
                if (screenConfig.map[y][x] === 2) {
                    pos.x += screenConfig.aisle.middle.w + screenConfig.seatMargin.w;
                } else if (screenConfig.map[y][x] === 3) {
                    pos.x += screenConfig.aisle.small.w + screenConfig.seatMargin.w;
                } else if (screenConfig.map[y][x] === 4) {
                    pos.x += screenConfig.aisle.middle.w + screenConfig.seatSize.w + screenConfig.seatMargin.w;
                } else if (screenConfig.map[y][x] === 5) {
                    pos.x += screenConfig.aisle.small.w + screenConfig.seatSize.w + screenConfig.seatMargin.w;
                } else if (screenConfig.map[y][x] === 6) {
                    pos.x += screenConfig.aisle.middle.w + screenConfig.seatSize.w + screenConfig.seatMargin.w;
                } else if (screenConfig.map[y][x] === 7) {
                    pos.x += screenConfig.aisle.small.w + screenConfig.seatSize.w + screenConfig.seatMargin.w;
                } else {
                    pos.x += screenConfig.seatSize.w + screenConfig.seatMargin.w;
                }
            }
        }
        // スクリーンタイプ
        const screenType = (screenConfig.type === 1)
            ? 'screen-imax' : (screenConfig.type === 2)
                ? 'screen-4dx' : '';

        return {
            screenConfig: screenConfig,
            objects: screenConfig.objects,
            screenType: screenType,
            lineLabels: (screenConfig.lineLabel) ? lineLabels : [],
            columnLabels: (screenConfig.columnLabel) ? columnLabels : [],
            seats: seats
        };
    }
}

export interface IData {
    screenConfig: IScreenConfig;
    objects: IObject[];
    screenType: string;
    lineLabels: ILabel[];
    columnLabels: ILabel[];
    seats: ISeat[];
}
