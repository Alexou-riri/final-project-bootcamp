import { updateLoadById } from '../../util/database';
// import {Load} from '../../util/database';

export default async function handler(request, response) {
  console.log('is this the iddddd', request.query.loadId);
  if (request.method === 'PUT') {
    // if the method is PUT update the animal and response the updated animal

    // access the body animal from the request object
    const palletFromRequest = request.body;

    // TODO: create error responses when the body don't have the full data. with a 400 status code

    const updatedLoadPallet = await updateLoadById(
      palletFromRequest.loadId,
      palletFromRequest.palletQuantityReceived,
    );

    response.status(200).json(updatedLoadPallet);
    return;
  }
  response.status(405).json({ error: 'Method not Allowed' });
}
