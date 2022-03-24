import { IChatData, IChat, IUser } from '@entities/chats/Chat';
import { Socket, Server } from 'socket.io';
import { addChat } from 'src/routes/api/v1/Chat';
export const chatSocket = (io: Server) => {

    let room: string;

    const chat = io.of('/chat').on('connection', (socket: Socket) => {

        socket.on('client_to_server_join', ({ data }: { data: { room: string} }) => {
            room =  "tv_" + data.room;
            console.log(room);
            socket.join(room);
        });
        
        // Frontにデータを送信する
        socket.on('client_to_server', async({ data }: { data: { chat: IChatData, user: IUser }}) => {
            const { user } = data
            const message: IChat = await addChat(data.chat)
            chat.to(room).emit('server_to_client', {data: { message: message, user: user }});
        });

        // データを受信し送信元のみに送信
        socket.on('cient_to_server_personal', (data: { name: string}) => {
            const id: string = socket.id;
            const name: string = data.name;
            const personalMessage: string = "あなたは" + name + "として入室";
            chat.to(id).emit('server_to_client', {value: personalMessage});
        });
        
        //disconnectイベントを受信し、退出メッセージを送信。
        socket.on('disconnect', () => {
            const endMessage = "退出しました。";
            chat.to(room).emit('server_to_client', {value: endMessage});
            console.log("disconnect from client");
        });
        
    });

}


