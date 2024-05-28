
import { Table, Button, Space } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import './CharPanel.css'

const CharPanel = ({ dataSource, onEdit, onDelete, onAdd }) => {
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id'
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title'
    },
    {
      title: 'URL',
      dataIndex: 'url',
      key: 'url',
      render: (text) => <a href={text} target="_blank" rel="noopener noreferrer">{text}</a>
    },
    {
      title: 'Acciones',
      key: 'actions',
      render: (text, record) => (
        <Space size="middle">
          <EditOutlined onClick={() => onEdit(record)} />
          <DeleteOutlined onClick={() => onDelete(record.key)} />
        </Space>
      )
    }
  ];

  return (
    <div className=' container-charPanel'>
      <h3>Características</h3>
      <Table dataSource={dataSource} columns={columns} pagination={false} />
      <Button type="primary" onClick={onAdd} style={{ marginTop: 16 }}>
        Agregar Característica
      </Button>
    </div>
  );
};

export default CharPanel;