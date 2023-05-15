import React from "react";
import { useQuery, gql } from "@apollo/client";

// GraphQLクエリを定義。helloフィールドをリクエスト
// gqlはGraphQLクエリをパースできる（GraphQLクエリをJavaScript内で書くことができる）
const HELLO_QUERY = gql`
  query GetHello {
    hello
  }
`;

const App: React.FC = () => {
  // useQueryフックを用いてGraphQLクエリを実行して結果を取得
  const { loading, error, data } = useQuery(HELLO_QUERY);

  // クエリがロード中の場合
  if (loading) return <p>ローディング中</p>;
  // クエリの実行中にエラーが発生した場合
  if (error) return <p>エラー</p>;
  // クエリが成功した場合
  return <h1>{data.hello}</h1>;
};

export default App;
