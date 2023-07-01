import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './style.css';
import { Table, Button, Input, Space, Modal, Form, Layout } from 'antd';

function StudentList() {
  const [students, setStudents] = useState([]);
  const [name, setName] = useState('');
  const [studentRoll, setStudentRoll] = useState('');
  const [editingStudent, setEditingStudent] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const BASE_URL = 'https://649fa046ed3c41bdd7a68b39.mockapi.io/api/v1';

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = () => {
    axios.get(`${BASE_URL}/students`)
      .then(res => {
        setStudents(res.data);
      })
      .catch(err => console.log(err))
  }

  const addStudent = () => {
    axios.post(`${BASE_URL}/students`, { name, class: studentRoll })
      .then(res => {
        fetchStudents();
        setName('');
        setStudentRoll('');
      })
      .catch(err => console.log(err));
  }

  const startEditing = (student) => {
    setEditingStudent(student);
    setName(student.name);
    setStudentRoll(student.roll);
    setIsModalVisible(true);
  }

  const updateStudent = () => {
    axios.put(`${BASE_URL}/students/${editingStudent.id}`, { name, class: studentRoll })
      .then(res => {
        fetchStudents();
        setIsModalVisible(false);
      })
      .catch(err => console.log(err));
  }

  const deleteStudent = (id) => {
    axios.delete(`${BASE_URL}/students/${id}`)
      .then(res => {
        fetchStudents();
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
      title: 'Roll',
      dataIndex: 'roll',
      key: 'roll',
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <Button onClick={() => startEditing(record)}>Edit</Button>
          <Button onClick={() => deleteStudent(record.id)}>Delete</Button>
        </Space>
      ),
    },
  ];

  return (
    <Layout.Content style={{ padding: '50px' }}>
      <h2 style={{ marginBottom: '1rem' }}>Add Student</h2>
      <Form layout="inline" style={{ marginBottom: '2rem' }}>
        <Form.Item>
          <Input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} style={{ marginRight: '1rem' }} />
        </Form.Item>
        <Form.Item>
          <Input placeholder="Roll" value={studentRoll} onChange={(e) => setStudentRoll(e.target.value)} style={{ marginRight: '1rem' }} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" onClick={addStudent}>Add</Button>
        </Form.Item>
      </Form>

      <h2>Students</h2>
      <Table columns={columns} dataSource={students} rowKey="id" />

      <Modal title="Edit Student" visible={isModalVisible} onOk={updateStudent} onCancel={() => setIsModalVisible(false)}>
        <Form layout="vertical">
          <Form.Item label="Name">
            <Input value={name} onChange={(e) => setName(e.target.value)} />
          </Form.Item>
          <Form.Item label="Roll">
            <Input value={studentRoll} onChange={(e) => setStudentRoll(e.target.value)} />
          </Form.Item>
        </Form>
      </Modal>
    </Layout.Content>
  );
}

export default StudentList;
