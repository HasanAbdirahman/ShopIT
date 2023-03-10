// this file will contain all the tags to add using helmet
import { Helmet } from "react-helmet";

function MetaData({ title }) {
  return (
    <Helmet>
      <title>{`${title} - ShopIT`}</title>
    </Helmet>
  );
}

export default MetaData;
