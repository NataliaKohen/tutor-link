import { useEffect, useState } from 'react';
import { getDataById } from '../../api/api';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Button, DatePicker, Tooltip } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import './Detail.css';
import Modal from 'react-modal';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';

const Detail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [teacherSelected, setTeacherSelected] = useState();
  const [galleryImages, setGalleryImages] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const { RangePicker } = DatePicker;

  const openModal = () => {
    setModalIsOpen(true);
  };

  // Función para cerrar la modal
  const closeModal = () => {
    setModalIsOpen(false);
  };

  useEffect(() => {
    const getById = async () => {
      let res = await getDataById(id);
      setTeacherSelected(res);
      console.log(teacherSelected);
    };

    getById();
  }, [id]);

  useEffect(() => {
    if (teacherSelected && teacherSelected.images) {
      const formattedImages = teacherSelected.images.map((image, index) => ({
        original: image.url,
        thumbnail: image.url,
        description: `Imagen ${index + 1}`,
      }));
      setGalleryImages(formattedImages);
    }
  }, [teacherSelected]);

//Función para calendario
  const disabledDate = (current) => {
    // Suponiendo que las fechas disponibles son del 10 al 20 de cada mes
    return current && (current.date() < 10 || current.date() > 20);
  };
  const renderExtraFooter = () => (
    <div>
      <Tooltip title="Fechas no disponibles" placement="bottom">
        <div
          style={{ background: '#ff4d4f', width: '100%', height: '10px' }}
        ></div>
      </Tooltip>
      <Tooltip title="Fechas disponibles" placement="bottom">
        <div
          style={{ background: '#52c41a', width: '100%', height: '10px' }}
        ></div>
      </Tooltip>
    </div>
  );

  return (
    <div>
      <div className="section-detail">
        <h2>{teacherSelected && teacherSelected.name}</h2>
        <Button
          className="btn-go-back"
          onClick={() => navigate(-1)}
          type="primary"
          icon={<ArrowLeftOutlined />}
        ></Button>
      </div>
      <div className="container-detail">
        {teacherSelected ? (
          <div className="container-teacher">
            <p>{teacherSelected.subject.title}</p>
            <p> {teacherSelected.description}</p>
          </div>
        ) : (
          <p>Cargando datos del tutor...</p>
        )}
        {teacherSelected && teacherSelected.images && (
          <div>
            <section className="container-image">
              <div className="cont-first-img">
                <img
                  src={teacherSelected.images[0].url}
                  alt={`imagen1`}
                  className="first-image"
                />
              </div>
              <div className="container-grid">
                <div className="cont-other-img">
                  {teacherSelected.images.slice(1, 5).map((image, index) => (
                    <img
                      key={index}
                      src={image.url}
                      alt={`imagen${index + 2}`}
                      className="item-image"
                    />
                  ))}
                </div>
                <Button type="primary" className="more" onClick={openModal}>
                  ver más
                </Button>
                <div style={{ padding: 24 }}>
                  <h3>Fechas disponibles Tutor</h3>
              <RangePicker
                disabledDate={disabledDate}
                renderExtraFooter={renderExtraFooter}
                onChange={(dates, dateStrings) =>
                  console.log(dates, dateStrings)
                }
              />
            </div>
              </div>
            </section>
           
            <div>
              <h3> Características: </h3>
              <div className="cont-other-img">
                {teacherSelected.characteristics.map((character) => (
                  <div key={character.id}> {character.name} </div>
                ))}
              </div>
            </div>
          </div>
        )}

        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel="Galería de Imágenes"
        >
          {/* Contenido de la modal */}
          <h2>Galería de Imágenes</h2>
          {galleryImages.length > 0 && <ImageGallery items={galleryImages} />}
          <Button type="primary" onClick={closeModal}>
            Cerrar
          </Button>
        </Modal>
      </div>
    </div>
  );
};

export default Detail;
