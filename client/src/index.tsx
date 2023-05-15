import React from "react";
import ReactDOM from "react-dom/client";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

// Apollo Clientの設定
const client = new ApolloClient({
  uri: "http://localhost:4000/graphql", // GraphQLサーバーのエンドポイントを指定する
  cache: new InMemoryCache(), // Apollo Clientのデータキャッシュを設定する
});

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

// ApolloProviderでApollo ClientをReactアプリケーションに統合する
// どのコンポーネントからでもApollo Clientを使ってGraphQL APIと通信できるようにする
root.render(
  <React.StrictMode>
    {/* client（インスタンス）を渡すのは必須 */}
    <ApolloProvider client={client}> 
      <App />
    </ApolloProvider>
  </React.StrictMode>
);

reportWebVitals();
