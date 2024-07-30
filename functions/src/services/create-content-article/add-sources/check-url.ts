export async function checkUrl(url: string): Promise<boolean> {
  try {
    const response = await fetch(`https://${url}`);
    if (response.status === 404) {
      console.log('Link is broken', url);
      return false;
    } else {
      console.log('Link is working:', url);
      return true;
    }
  } catch (error) {
    console.error('Error:', error);
    return false;
  }
}
