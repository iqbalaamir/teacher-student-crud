import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './style.css';
import { Table, Button, Input, Space, Modal, Form, Layout } from 'antd';

function TeacherList() {
  const [teachers, setTeachers] = useState([]);
  const [name, setName] = useState('');
  const [subject, setSubject] = useState('');
  const [editingTeacher, setEditingTeacher] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const BASE_URL = 'https://649fa046ed3c41bdd7a68b39.mockapi.io/api/v1';

  useEffect(() => {
    fetchTeachers();
  }, []);

  const fetchTeachers = () => {
    axios.get(`${BASE_URL}/teachers`)
      .then(res => {
        setTeachers(res.data);
      })
      .catch(err => console.log(err))
  }

  const addTeacher = () => {
    axios.post(`${BASE_URL}/teachers`, { name, subject })
      .then(res => {
        fetchTeachers();
        setName('');
        setSubject('');
      })
      .catch(err => console.log(err));
  }

  const startEditing = (teacher) => {
    setEditingTeacher(teacher);
    setName(teacher.name);
    setSubject(teacher.subject);
    setIsModalVisible(true);
  }

  const updateTeacher = () => {
    axios.put(`${BASE_URL}/teachers/${editingTeacher.id}`, { name, subject })
      .then(res => {
        fetchTeachers();
        setIsModalVisible(false);
      })
      .catch(err => console.log(err));
  }

  const deleteTeacher = (id) => {
    axios.delete(`${BASE_URL}/teachers/${id}`)
      .then(res => {
        fetchTeachers();
      })
      .catch(err => console.log(err));
  }

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Subject',
      dataIndex: 'subject',
      key: 'subject',
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <Button onClick={() => startEditing(record)}>Edit</Button>
          <Button onClick={() => deleteTeacher(record.id)}>Delete</Button>
        </Space>
      ),
    },
  ];

  return (
    <Layout.Content style={{ padding: '50px' }}>
      <h2 style={{ marginBottom: '1rem' }}>Add Teacher</h2>
      <Form layout="inline" style={{ marginBottom: '2rem' }}>
        <Form.Item>
          <Input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} style={{ marginRight: '1rem' }} />
        </Form.Item>
        <Form.Item>
          <Input placeholder="Subject" value={subject} onChange={(e) => setSubject(e.target.value)} style={{ marginRight: '1rem' }} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" onClick={addTeacher}>Add</Button>
        </Form.Item>
      </Form>

      <h2>Teachers</h2>
      <Table columns={columns} dataSource={teachers} rowKey="id" />

      <Modal title="Edit Teacher" visible={isModalVisible} onOk={updateTeacher} onCancel={() => setIsModalVisible(false)}>
        <Form layout="vertical">
          <Form.Item label="Name">
            <Input value={name} onChange={(e) => setName(e.target.value)} />
          </Form.Item>
          <Form.Item label="Subject">
            <Input value={subject} onChange={(e) => setSubject(e.target.value)} />
          </Form.Item>
        </Form>
      </Modal>
    </Layout.Content>
  );
}

export default TeacherList;
