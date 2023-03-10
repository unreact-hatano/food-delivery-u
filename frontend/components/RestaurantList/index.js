import Link from "next/link";
import { Card, CardBody, CardImg, CardTitle, Col, Row } from "reactstrap";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";

const query = gql`
  {
    restaurants {
      id
      name
      description
      image {
        url
      }
    }
  }
`;

const RestaurantList = (props) => {
  const { loading, error, data } = useQuery(query);
  console.log(data);

  if (error) return <h2>レストランの読み込みに失敗しました</h2>;

  if (loading) return <h2>ロード中...</h2>;

  if (data && data.restaurants.length) {
    const searchQuery = data.restaurants.filter((restaurant) =>
      restaurant.name.toLowerCase().includes(props.search),
    );
    return (
      <Row>
        {searchQuery.map((restaurant) => (
          <Col xs="6" sm="4" key={restaurant.id}>
            <Card style={{ margin: "0 0.5rem 20px 0.5rem" }}>
              <CardImg
                src={`${process.env.NEXT_PUBLIC_API_URL}${restaurant.image[0].url}`}
                top={true}
                style={{ height: 250 }}
              />
              <CardBody>
                <CardTitle>{restaurant.name}</CardTitle>
                <CardTitle>{restaurant.description}</CardTitle>
              </CardBody>
              <div className="card-footer">
                <Link
                  as={`/restaurants/${restaurant.id}`}
                  href={`/restaurants?id=${restaurant.id}`}
                >
                  <a className="btn btn-primary">もっと見る</a>
                </Link>
              </div>
            </Card>
          </Col>
        ))}
        <style jsx>{`
          a {
            color: white;
          }
          a:link {
            text-decoration: none;
            color: white;
          }
          a:hover {
            color: white;
          }
          .card-colums {
            column-count: 3;
          }
        `}</style>
      </Row>
    );
  } else {
    return <h1>レストランが見つかりませんでした。</h1>;
  }
};

export default RestaurantList;
