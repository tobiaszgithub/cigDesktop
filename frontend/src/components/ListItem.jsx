import { useEffect, useState } from "react";
import { Avatar, Card, Skeleton } from "antd";
const { Meta } = Card;

const ListItem = ({ item, onSelect, selectedItem, title ,content}) => {
  const [loading, setLoading] = useState(true);
  const [gridStyle, setGridStyle] = useState({
    margin: "3%",
    width: "94%",
  });

  useEffect(() => {
    const isSelected = selectedItem?.Id === item.Id;
    setGridStyle({
        margin: "3%",
        width: "94%",
      ...(isSelected && { backgroundColor: "lightblue" }),
    });

  }, [selectedItem]);

  const onClickHandler = () => {
    onSelect(item);
  };

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  return (
    <Card.Grid hoverable={true} style={gridStyle} onClick={onClickHandler}>
      <Skeleton loading={loading} avatar active>
        <Card>
          <Meta title={title} description={`Authored by: ${item.CreatedBy}`}/>
          {content}
        </Card>

      </Skeleton>
    </Card.Grid>
  );
};

export default ListItem;
