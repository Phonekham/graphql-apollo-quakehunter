import React, { Fragment } from "react";
import { useQuery } from "@apollo/react-hooks";
import { useApolloClient } from "@apollo/react-hooks";
import "./App.css";
import QuakeTile from "./components/QuakeTile";
import gql from "graphql-tag";
import Header from "./components/Header";

const GET_QUAKES = gql`
  query launchList($after: String) {
    quakes(after: $after) {
      cursor
      hasMore
      quakes {
        magnitude
        location
      }
    }
  }
`;

const Quakes = () => {
  const { data, loading, error, fetchMore } = useQuery(GET_QUAKES);
  const client = useApolloClient();

  const logoutHandler = (e) => {
    e.preventDefault();
    client.writeData({ data: { isLoggedIn: false } });
    localStorage.clear();
  };

  if (loading) return <p>loading...</p>;
  if (error) return <p>ERROR</p>;
  if (!data) return <p>Not found</p>;

  return (
    <Fragment>
      <Header></Header>
      <button type="submit" onClick={logoutHandler}>
        logout
      </button>
      {data.quakes &&
        data.quakes.quakes &&
        data.quakes.quakes.map((quake) => (
          <QuakeTile
            key={quake.id}
            id={quake.id}
            magnitude={quake.magnitude}
            location={quake.location}
            when={quake.when}
          />
        ))}

      {data.quakes && data.quakes.hasMore && (
        <button
          onClick={() =>
            fetchMore({
              variables: {
                after: data.quakes.cursor,
              },

              updateQuery: (prev, { fetchMoreResult, ...rest }) => {
                if (!fetchMoreResult) return prev;
                return {
                  ...fetchMoreResult,
                  quakes: {
                    ...fetchMoreResult.quakes,
                    quakes: [
                      ...prev.quakes.quakes,
                      ...fetchMoreResult.quakes.quakes,
                    ],
                  },
                };
              },
            })
          }
        >
          Load More
        </button>
      )}
    </Fragment>
  );
};

export default Quakes;
