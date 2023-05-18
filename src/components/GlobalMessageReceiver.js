import React, {useEffect, useState} from 'react';
import { Client } from '@stomp/stompjs';
import SockJS from "sockjs-client";

const GlobalMessageReceiver = () => {
    let [currentMessage, setCurrentMessage] = useState('')

    useEffect(() => {
        // Создаем новый экземпляр клиента STOMP
        const client = new Client();

        // Устанавливаем соединение с WebSocket сервером
        client.webSocketFactory = () => new SockJS('https://anitypes.site/push-time'); // Замените URL на ваш сервер WebSocket

        // Обработчик успешного подключения
        const onConnect = () => {
            console.log('Connected to [GN]');

            // Подписываемся на топик '/topic/global'
            client.subscribe('/topic/global', message => {
                console.log('[GN] Received message:', message.body);
                setCurrentMessage(message.body)
            });
        };

        // Обработчик ошибки подключения
        const onError = error => {
            console.error('WebSocket connection error:', error);
        };

        client.onConnect = onConnect;
        client.onStompError = onError;

        client.activate();

        return () => {
            client.deactivate();
        };
    }, []);

    return (
        <>
            {
                currentMessage === '' ? '' :
                    <div className="message_rec_div">
                        <div className="message_rec_block" onClick={() => setCurrentMessage('')}>
                            {currentMessage}
                            <p className="message_rec_block_hide">Нажмите на окно, что бы его закрыть</p>
                        </div>
                    </div>
            }
        </>
    );
};

export default GlobalMessageReceiver;