import './Card.css';
import Tag from './Tag.js';

function Card({ image, title, subtitle, description, link, tags }) {
  return (
    <a
      className="card__link"
      href={link}
      target="_blank"
      rel="noopener noreferrer"
    >
      <div className="card">
        <div className="card-upper">
          <img src={image} className="card-upper__image" alt="" />
        </div>
        <div className="card-lower">
          <h1 className="card-lower__title">{title}</h1>
          <h2 className="card-lower__subtitle">{subtitle}</h2>
          <p className="card-lower__description">{description}</p>
          <div className="card-lower__tags">
            {tags.map((tag, index) => (
              <Tag key={index} label={tag.label} color={tag.color} />
            ))}
          </div>
        </div>
      </div>
    </a>
  );
}

export default Card;
