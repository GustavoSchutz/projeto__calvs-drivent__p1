
async function getHotels(userId: number) {
  await getHotels(userId);

  const hotels = await hotelRepository.findHotels();
  return hotels;
}

const hotelsService = {
  getHotels,
};

export default hotelsService;
