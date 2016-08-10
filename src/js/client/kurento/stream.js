class Stream {
	constructor(messenger){
		this.error = null;
		this.messenger = messenger;
	}

	onOfferPresenter(error, sdpOffer, type){
		if (error) {
			this.onError(error);
			return
		}

		console.log('sdpOffer', type, sdpOffer)

		var message = {
			type : type,
			sdpOffer : sdpOffer
		};
		this.messenger.sendMessage(message).catch((error) => {
			this.onError(error);
		});
	}

	onError(error){
		this.error = error;

		console.error('Еррор сука блеать', error)
	}

	destroy(){
		this.messenger.destroy();
		this.messenger = null;
	}
}

export default Stream