import axios from "axios";

const getUserDetails = async () => {
  try {
    // artificial delay
    await new Promise((resolve) =>
      setTimeout(resolve, 2000))
    const response = await axios.get('http://localhost:3000/api/user'); //not optimal, since sending req from next server back to next server
    // instead bring the GET logic from route.tsx to retrieve data using prsima here itself
    return response.data;
  }

  catch (error) {
    throw error
  }
}

export default async function Home() {
  const userData = await getUserDetails();

  return (
    <div className="flex flex-col justify-center h-screen">
      <div className="flex justify-center">
        <div className="border p-8 rounded">
          <div>
            Name: {userData?.name}
          </div>

          {userData?.email}
        </div>
      </div>
    </div>
  );
}

