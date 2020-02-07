import { Component } from "react";
import styled from "styled-components";
import { formatDate } from "../../pages/member/[mid]";
import { theme } from "../../styles/theme";
export class MemberRssFeed extends Component<
  { url: string },
  { articles: any[] }
> {
  state = {
    articles: []
  };

  fetchFeed = () => {
    var request = new XMLHttpRequest();
    request.onreadystatechange = () => {
      if (request.readyState == 4 && request.status == 200) {
        var myObj = JSON.parse(request.responseText);
        this.setState({ articles: myObj.items });
      }
    };
    request.open(
      "GET",
      `https://api.rss2json.com/v1/api.json?rss_url=${encodeURI(
        this.props.url
      )}`,
      true
    );
    request.send();
  };

  componentDidMount() {
    {
      this.fetchFeed();
    }
  }

  //   title: "Senators Warren, King Question USAID on Decision to Shutter Global Infectious Disease Prevention Program"
  //   pubDate: "2020-01-31 18:31:00"
  //   link: "http://www.warren.senate.gov/oversight/letters/senators-warren-king-question-usaid-on-decision-to-shutter-global-infectious-disease-prevention-program"
  //   guid: "http://www.warren.senate.gov/oversight/letters/senators-warren-king-question-usaid-on-decision-to-shutter-global-infectious-disease-prevention-program"
  //   author: "webmaster@warren.senate.gov"
  //   thumbnail: ""
  //   description: ""
  //   content: ""
  //   enclosure: {}
  //   categories: []

  render() {
    return (
      <div>
        Press Releases:
        <PressReleaseContainer>
          {this.state.articles.map(art => {
            return <PressRelease key={generateComponentKey("feed")} {...art} />;
          })}
        </PressReleaseContainer>
      </div>
    );
  }
}

const PressReleaseContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 1rem;
  padding: 1rem;
  margin: 1rem;
`;

const ImgHolder = styled.div`
  background: ${theme.grey1};
  width: 70px;
  box-shadow: 0 0 5px #ccc;
  border: 2px solid #f9f9f9;
  object-position: top;
  object-fit: cover;
  height: 70px;
  border-radius: 500px;
`;

const ImgStyled = styled.img`
  background: ${theme.grey1};
  width: 70px;
  box-shadow: 0 0 5px #ccc;
  border: 2px solid #f9f9f9;
  object-position: top;
  object-fit: cover;
  height: 70px;
  border-radius: 500px;
`;

const PressReleaseItem = styled.div`
  display: grid;
  grid-template-columns: 80px 1fr;
  grid-gap: 1rem;
  justify-content: center;
  align-items: center;
`;

let componentKeyIndex = 5;
export function generateComponentKey(prefix = "component") {
  return `${prefix}-${componentKeyIndex++}`;
}

function PressRelease({
  title,
  pubDate,
  link,
  guid,
  author,
  thumbnail,
  categories
}) {
  return (
    <PressReleaseItem key={`${generateComponentKey("rss")}}`}>
      {thumbnail ? <ImgStyled src={thumbnail} alt={title} /> : <ImgHolder />}
      <div className="title">
        <a
          target="_blank"
          href={encodeURI(link)}
          dangerouslySetInnerHTML={{ __html: title }}
        ></a>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
          <small>
            <small>
              <i>Published</i>
            </small>
            {author && `by ${author}`}{" "}
            <small>
              <i>on</i>
            </small>{" "}
            {formatDate(pubDate)}
          </small>
          {categories.length ? (
            <small>
              Categories:
              {categories.map(c => (
                <small key={generateComponentKey("category")}>
                  <i>{c}</i>
                </small>
              ))}
            </small>
          ) : (
            <></>
          )}
        </div>
      </div>
    </PressReleaseItem>
  );
}
