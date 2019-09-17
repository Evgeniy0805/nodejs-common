
import {ErrorSys} from './ErrorSys';
import MainRequest from './MainRequest';

import axios from "axios";

/**
 * Системный сервис формирования ответа
 */
export class ResponseSys
{
	private env:string;
	private req:MainRequest;
	private ifDevMode:boolean;

	private errorSys:ErrorSys;

	constructor(req:MainRequest){

		this.req = req;
		this.env = req.conf.common.env;
		if( this.env == 'local' || this.env == 'dev' ){
			this.ifDevMode = true;
		} else {
			this.ifDevMode = false;
		}

		this.errorSys = req.sys.errorSys;

	}

	/**
	 * Формирование ответа клиенту
	 *
	 * @param array|null data
	 * @param string sMsg
	 * @return array
	 */
	public response(data:any, sMsg:string): any{



		let out:any = {
			'ok' : this.errorSys.isOk(),
			'e' : !this.errorSys.isOk(),
			'errors' : this.errorSys.getErrors(),
			// 'warning' : this.errorSys.getWarning(), // Временно убраны пользовательские предупреждения
			// 'notice' : this.errorSys.getNotice(), // Временно убраны пользовательские предупреждения
			'msg' : sMsg,
		};

		// Отправка ошибок в матермост
		axios.post(this.req.conf.common.hook_url, {
			text: "Hello, this error:"+JSON.stringify(this.errorSys.getErrors())
		}).then((res:any) => {
			console.log('Я отправил в матермост:',res);
		}).catch((e) => {
			console.log('Я не отправил в матермост:', e);
		});

		if( this.ifDevMode ){ // Выводит информацию для разработчиков и тестрировщиков
			out['dev_warning'] = this.errorSys.getDevWarning();
			out['dev_notice'] = this.errorSys.getDevNotice();
			out['dev_declare'] = this.errorSys.getDevDeclare();
			out['dev_log'] = this.errorSys.getDevLog();
		}

		if( this.errorSys.isOk() ){
			out['data'] = data;
		} else {
			out['data'] = null;
			out['msg'] = 'Что то пошло не так - обратитесь к администратору';
		}

		return out;
	}
}
