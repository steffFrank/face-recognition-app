const updateEntries = (req, res, db) => {
  const { id } = req.body;
  db("users")
    .where({ id: id })
    .increment("entries", 1)
    .returning("entries")
    .then((entries) => {
      res.json(entries[0].entries);
    })
    .catch((error) => res.status(400).json("Something went wrong!"));
};

const USER_ID = process.env.REACT_APP_USER_ID;
const PAT = process.env.REACT_APP_PAT;
const APP_ID = process.env.REACT_APP_APP_ID;
const MODEL_ID = process.env.REACT_APP_MODEL_ID;
const MODEL_VERSION_ID = process.env.REACT_APP_MODEL_VERSION_ID;

const handleApiCall = async (req, res) => {
  const input = req.body.input;
  // Fecth body
  const raw = JSON.stringify({
    user_app_id: {
      user_id: USER_ID,
      app_id: APP_ID,
    },
    inputs: [
      {
        data: {
          image: {
            url: input,
          },
        },
      },
    ],
  });

  // Fetch options
  const requestOptions = {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: "Key " + PAT,
    },
    body: raw,
  };

  try {
    const url = `https://api.clarifai.com/v2/models/${MODEL_ID}/versions/${MODEL_VERSION_ID}/outputs`;

    const response = await fetch(url, requestOptions);
    const result = await response.json();
    const box_info = result.outputs[0].data.regions;
    res.json(box_info);
  } catch (error) {
    res.status(400).json("unable to fetch the source image");
  }
};

module.exports = { updateEntries, handleApiCall };
