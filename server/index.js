const { ApolloServer, gql } = require("apollo-server");

let messages = []; // メッセージを保存する配列

// typeDefs（スキーマ定義：クライアントがサーバーに問い合わせ可能なクエリやデータの変更操作を定義するもの）
const typeDefs = gql`
  type Query {
    hello: String
    messages: [String]
  }
  type Mutation {
    addMessage(message: String): String
  }
`;

// resolvers（リゾルバ定義：リゾルバはクエリに対する答え方を定義するもの）
const resolvers = {
  Query: {
    hello: () => "Hello, world!",
    messages: () => messages, // 全てのメッセージを返すリゾルバ
  },
  // Mutation（GraphQL）：サーバー上のデータを変更する操作
  Mutation: {
    addMessage: (_, { message }) => {
      //第一引数は現在のオブジェクトの状態、第二引数はクライアントから送られてくるデータ
      // メッセージを追加するリゾルバ
      messages.push(message);
      return message;
    },
  },
};

// サーバーの作成
const server = new ApolloServer({ typeDefs, resolvers });

// サーバーの起動
server.listen().then(({ url }) => {
  console.log(`サーバー準備完了： ${url}`);
});
