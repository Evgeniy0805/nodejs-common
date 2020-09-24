import { ErrorSys } from '@a-a-game-studio/aa-components/lib';
import { MainRequest } from './MainRequest';
interface MattermostField {
    short: boolean;
    title: string;
    value: string;
}
interface MattermostMsg {
    attachments: {
        fallback: string;
        color: string;
        text: string;
        title: string;
        fields: MattermostField[];
    }[];
}
/**
 * Класс для работы с MatterMost'ом
 */
export declare class MattermostSys {
    protected req: MainRequest;
    protected errorSys: ErrorSys;
    constructor(req: MainRequest);
    /**
     * Отправить сообщение об ошибке в чат errors
     * @param errorSys
     * @param err
     * @param addMessage
     */
    sendErrorMsg(errorSys: ErrorSys, err: Error, addMessage: string): void;
    /**
     * Отправить сообщение об ошибке в чат errors
     * @param errorSys
     * @param err
     * @param addMessage
     */
    sendFrontErrorMsg(aError: {
        title: string;
        value: string;
    }[], sMessage: string): void;
    /**
     * Отправить сообщение по мониторингу RabbitMQ
     * @param sTitle - Заголово сообщения
     * @param sMsg - Сообщение
     */
    sendMonitoringMsg(sTitle: string, sMsg: string): void;
    /**
     * общий метод для отправки сообщения
     * @param msg
     * @param hook_url
     */
    send(msg: MattermostMsg, hook_url: string): void;
}
export {};
