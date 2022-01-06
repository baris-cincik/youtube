import { useEffect, useState } from 'react';
import PortfolioList from '../portfolioList/PortfolioList';
import './portfolio.scss';
import {
  featuredPortfolio,
  webPortfolio,
  mobilePortfolio,
  designPortfolio,
  contentPortfolio,
} from '../../data';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

export default function Portfolio() {
  const [selected, setSelected] = useState('featured');
  const [data, setData] = useState([]);
  const [show, setShow] = useState(false);
  const [modalText, setModalText] = useState('Project Description');
  const handleClose = () => {
    setShow(false);
    setModalText('Project Description');
  };
  const handleShow = () => setShow(true);
  const [currentProject, setcurrentProject] = useState({});

  const list = [
    {
      id: 'featured',
      title: 'Featured',
    },
    {
      id: 'web',
      title: 'Web Apps',
    },
    {
      id: 'mobile',
      title: 'Mobile Apps',
    },
  ];

  useEffect(() => {
    switch (selected) {
      case 'featured':
        setData(featuredPortfolio);
        break;
      case 'web':
        setData(webPortfolio);
        break;
      case 'mobile':
        setData(mobilePortfolio);
        break;
      case 'design':
        setData(designPortfolio);
        break;
      case 'content':
        setData(contentPortfolio);
        break;
      default:
        setData(featuredPortfolio);
    }
  }, [selected]);

  function projectClicked(project) {
    console.log('project clicked: ' + project);
    setcurrentProject(project);
    handleShow();
  }

  return (
    <div className="portfolio" id="portfolio">
      <h1>Portfolio</h1>
      <ul>
        {list.map((item) => (
          <PortfolioList
            title={item.title}
            active={selected === item.id}
            setSelected={setSelected}
            id={item.id}
          />
        ))}
      </ul>
      <div className="container">
        {data.map((d) => (
          <div className="item">
            <button
              className="project-button"
              onClick={() => projectClicked(d)}
            >
              <img src={d.img} alt="" />
            </button>
            <h3 onClick={() => projectClicked(d)}>{d.title}</h3>
          </div>
        ))}
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{currentProject.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{currentProject.info}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" href={currentProject.url} target="_blank">
            View Project
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
