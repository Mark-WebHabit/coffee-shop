const whiteList = ["http://localhost:3000", "http://127.0.0.1:3000"];

export const corsOption = {
  credentials: true,
  origin: (origin, callback) => {
    if (whiteList.indexOf(origin) !== -1 || !origin) {
      //!origin allow to test server into localhost (testing)
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS!"));
    }
  },
};
