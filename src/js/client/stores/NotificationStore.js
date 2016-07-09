import { Enum } from 'enumify';

class NotificationTypes extends Enum {}
NotificationTypes.initEnum(['ERROR', 'WARNING', 'SUCCESS']);

export { NotificationTypes }

let nid = 0;
let genId = function(){
	return nid++;
}


class NotificationStore {
	constructor() {
		this.notifications = [];

		this.bindActions(this.alt.getActions('NotificationActions'))
	}

	onAddError(errorMessage) {
		let n = {
			id: genId(),
			type: NotificationTypes.ERROR,
			message: errorMessage
		}
		this.notifications.push(n)
	}

	onRemove(id) {
		this.notifications = this.notifications.filter((n) => {
			if (n.id == id){
				return false;
			}

			return true;
		});
	}
}

export default NotificationStore