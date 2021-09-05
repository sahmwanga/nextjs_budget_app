import clientPromise from '../lib/mongodb';

export default function Home({ expenses }) {
  return (
    <div className="container">
      <ul>
        {expenses.map((value) => (
          <div key={value._id}>
            <li>{value._id}</li>
            <div>{value.description}</div>
            <div>{value.amount}</div>
            <div>{value.category}</div>
            <div>{value.datetime}</div>
            <br />
          </div>
        ))}
      </ul>
    </div>
  );
}

export async function getStaticProps(context) {
  const client = await clientPromise;

  // client.db() will be the default database passed in the MONGODB_URI
  // You can change the database by calling the client.db() function and specifying a database like:
  // const db = client.db("myDatabase");
  // Then you can execute queries against your database like so:
  // db.find({}) or any of the MongoDB Node Driver commands

  const db = await client.db('budget_application');
  const data = await db.collection('expenses').find({}).toArray();

  // console.log({ client: data[0].description });

  return {
    props: { expenses: JSON.parse(JSON.stringify(data)) },
  };
}
