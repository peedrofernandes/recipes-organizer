import axios from "axios"

export const services = {
  async postImage(image: File): Promise<string> {
    try {
      const response = await axios({
        method: "post",
        url: "https://www.filestackapi.com/api/store/S3?key=AcVVKcqizSpy6YYdWF9KRz",
        data: image,
        headers: { "Content-Type": image.type }
      })
      console.log(`Response: ${JSON.stringify(response)}`)
      return response.data.url
    } catch (error) {
      throw new Error("There was an error posting ingredient image!")
    }
  },
  async retrieveImage(imageUrl: string): Promise<File> {
    try {
      const response = await axios.get(imageUrl, { responseType: "blob" })
      const type = response.headers["Content-Type"]?.toString()
      const blob = new Blob(
        [response.data],
        { type }
      )
      const file = new File([blob], "ingredientImage", { type })
      return file
    } catch (error) {
      throw new Error("There was an error fetching ingredient image!")
    }
  }
}