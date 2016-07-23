getTicker(symbol: string): Observable<TickerMessage> {
    const socket = this.socket;

    return Observable.create(subscriber => {
        const msgSub = socket.out
            .filter(d => d.symbol === symbol)
            .subscribe(subscriber);

        socket.send({ symbol, type: 'subscribe' });

        return () => {
            socket.send({ symbol, type: 'unsubscribe' });
            msgSub.unsubscribe();
        };
    })
    .retryWhen(errors => errors.switchMap(err => {
        this.connectionState.next(ConnectionStates.RETRYING);
        return navigator.onLine ?
            Observable.timer(3000) :
            Observable.fromEvent(window, 'online').take(1);
    }))
    .share();
}