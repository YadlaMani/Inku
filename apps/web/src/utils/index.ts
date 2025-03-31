import axios from "axios";
export async function getRoomChats(roomId: string) {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_HTTP_URL}/api/v1/room/chats/${roomId}`,

      {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_TEST_USER_TOKEN}`,
        },
      }
    );
    if (response.data.success) {
      return JSON.stringify({
        chats: response.data.data,
        success: true,
      });
    }
    return JSON.stringify({
      success: false,
      message: response.data.message,
    });
  } catch (err) {
    console.log(err);
    return JSON.stringify({
      success: false,
      message: "Invalid room id",
    });
  }
}
