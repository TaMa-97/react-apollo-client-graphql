import React, { useState } from "react";
import { useQuery, useMutation, gql } from "@apollo/client";

// GraphQLクエリを定義（hello,messagesフィールド）
// gqlはGraphQLクエリをパースできる（GraphQLクエリをJavaScript内で書くことができる）
const HELLO_QUERY = gql`
  query GetHello {
    hello
    messages
  }
`;
// メッセージを追加するためのGraphQLMutation定義
const ADD_MESSAGE_MUTATION = gql`
  mutation AddMessage($message: String) {
    addMessage(message: $message)
  }
`;

const App: React.FC = () => {
  // useQueryフックを用いてGraphQLクエリを実行して結果を取得
  const { loading, error, data } = useQuery(HELLO_QUERY);

  // useMutationフックを用いてMutationを実行できる関数を取得
  // Mutationが成功したらキャッシュを更新する
  const [addMessageMutation] = useMutation(ADD_MESSAGE_MUTATION, {
    update(cache, { data: { addMessage } }) {
      cache.modify({
        fields: {
          messages(existingMessages = []) {
            return [...existingMessages, addMessage]; // 新しいメッセージを既存のメッセージリストに追加
          },
        },
      });
    },
  });

  // 新しいメッセージを入力するためのstate
  const [newMessage, setNewMessage] = useState("");

  // クエリがロード中の場合
  if (loading) return <p>ローディング中</p>;
  // クエリの実行中にエラーが発生した場合
  if (error) return <p>エラー</p>;

  // 送るボタンがクリックされた時の処理
  const handleSendMessage = () => {
    // Mutationを実行して新しいメッセージを追加
    addMessageMutation({ variables: { message: newMessage } });
    // 新しいメッセージ入力欄をクリア
    setNewMessage("");
  };

  // クエリが成功した場合
  return (
    <div>
      <h1>{data.hello}</h1>
      <ul>
        {data.messages.map((message: string, index: number) => (
          <li key={index}>{message}</li>
        ))}
      </ul>
      <input
        type="text"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
      />
      <button onClick={handleSendMessage}>送る</button>
    </div>
  );
};

export default App;
