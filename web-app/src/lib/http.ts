export function sendGetRequest(url: string): Promise<any> {
  return fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      console.log(response.json());
      return response.json();
    })
    .catch(error => {
      console.error('Error:', error);
      throw error;
    });
}