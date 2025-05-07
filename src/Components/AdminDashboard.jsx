import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  DashboardOutlined,
  ShoppingOutlined,
  UserOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  LogoutOutlined
} from '@ant-design/icons';
import {
  Layout,
  Menu,
  Table,
  Card,
  Button,
  Modal,
  Form,
  Input,
  InputNumber,
  Select,
  message,
  Statistic,
  Avatar,
  Badge,
  Popconfirm,
  Space,
  Divider
} from 'antd';

const { Header, Content } = Layout;
const { Option } = Select;

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [editingProduct, setEditingProduct] = useState(null);
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const fetchUsers = async () => {
    try {
      const response = await fetch('https://ttok.pythonanywhere.com/api/users');
      const data = await response.json();
      setUsers(data.users || []);
    } catch {
      message.error('Failed to fetch users');
    }
  };

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://ttok.pythonanywhere.com/api/get_products');
      const data = await response.json();
      setProducts(data.products || []);
    } catch {
      message.error('Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (productId) => {
    try {
      const response = await fetch(`https://ttok.pythonanywhere.com/api/delete_product/${productId}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        message.success('Product deleted');
        fetchProducts();
      } else {
        message.error('Delete failed');
      }
    } catch {
      message.error('Error deleting product');
    }
  };

  const addOrUpdateProduct = async (values) => {
    const isEdit = !!editingProduct;
    const url = isEdit
      ? `https://ttok.pythonanywhere.com/api/update_product/${editingProduct.id}`
      : 'https://ttok.pythonanywhere.com/api/add_product';

    try {
      const response = await fetch(url, {
        method: isEdit ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        message.success(isEdit ? 'Product updated' : 'Product added');
        setIsModalVisible(false);
        setEditingProduct(null);
        form.resetFields();
        fetchProducts();
      } else {
        message.error(isEdit ? 'Update failed' : 'Add failed');
      }
    } catch {
      message.error(isEdit ? 'Error updating product' : 'Error adding product');
    }
  };

  const openEditModal = (product) => {
    setEditingProduct(product);
    form.setFieldsValue({
      name: product.name,
      price: product.price,
      category: product.category,
      stock: product.stock_quantity,
      description: product.description,
    });
    setIsModalVisible(true);
  };

  useEffect(() => {
    fetchUsers();
    fetchProducts();
  }, []);

  const productColumns = [
    { title: 'Name', dataIndex: 'name', key: 'name' },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (price) => `$${price.toFixed(2)}`
    },
    { title: 'Category', dataIndex: 'category', key: 'category' },
    { title: 'Stock', dataIndex: 'stock_quantity', key: 'stock' },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space size="middle">
          <Button
            size="small"
            type="primary"
            icon={<EditOutlined />}
            onClick={() => openEditModal(record)}
          />
          <Popconfirm
            title="Delete this product?"
            onConfirm={() => deleteProduct(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button size="small" danger icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const userColumns = [
    {
      title: '',
      dataIndex: 'avatar',
      key: 'avatar',
      render: () => <Avatar src="https://joeschmoe.io/api/v1/random" />
    },
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Email', dataIndex: 'email', key: 'email' },
    { title: 'Role', dataIndex: 'role', key: 'role' },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <>
            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginBottom: 24 }}>
              <Card bordered style={{ flex: 1, minWidth: 200 }}><Statistic title="Users" value={users.length} /></Card>
              <Card bordered style={{ flex: 1, minWidth: 200 }}><Statistic title="Products" value={products.length} /></Card>
              <Card bordered style={{ flex: 1, minWidth: 200 }}><Statistic title="Revenue" value={15890} prefix="$" /></Card>
            </div>
            <Divider />
            <Card title="Recent Products" size="small" bodyStyle={{ padding: 12 }}>
              <Table
                columns={productColumns}
                dataSource={products.slice(0, 5)}
                rowKey="id"
                loading={loading}
                pagination={false}
                size="small"
              />
            </Card>
          </>
        );
      case 'products':
        return (
          <Card
            title="Products Management"
            size="small"
            extra={<Button type="primary" icon={<PlusOutlined />} onClick={() => {
              setIsModalVisible(true);
              setEditingProduct(null);
              form.resetFields();
            }}>Add Product</Button>}
            bodyStyle={{ padding: 12 }}
          >
            <Table
              columns={productColumns}
              dataSource={products}
              rowKey="id"
              loading={loading}
              pagination={{ pageSize: 10 }}
              size="small"
            />
          </Card>
        );
      case 'users':
        return (
          <Card title="User Management" size="small" bodyStyle={{ padding: 12 }}>
            <Table
              columns={userColumns}
              dataSource={users}
              rowKey="id"
              pagination={{ pageSize: 10 }}
              size="small"
            />
          </Card>
        );
      default:
        return null;
    }
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ background: '#fff', padding: 0 }}>
        <Menu
          mode="horizontal"
          selectedKeys={[activeTab]}
          onClick={({ key }) => setActiveTab(key)}
          style={{ lineHeight: '64px' }}
        >
          <Menu.Item key="dashboard" icon={<DashboardOutlined />}>
            Dashboard
          </Menu.Item>
          <Menu.Item key="products" icon={<ShoppingOutlined />}>
            Products
          </Menu.Item>
          <Menu.Item key="users" icon={<UserOutlined />}>
            Users
          </Menu.Item>
          <Menu.Item 
            key="logout" 
            icon={<LogoutOutlined />}
            onClick={() => {
              localStorage.removeItem('adminToken');
              navigate('/admin/login');
            }}
            style={{ float: 'right' }}
          >
            Logout
          </Menu.Item>
          <Menu.Item key="avatar" style={{ float: 'right' }} disabled>
            <Badge count={5}>
              <Avatar icon={<UserOutlined />} />
            </Badge>
          </Menu.Item>
        </Menu>
      </Header>

      <Content style={{ margin: '16px' }}>
        <div style={{ padding: 16, background: '#fff' }}>
          {renderContent()}
        </div>
      </Content>

      <Modal
        title={editingProduct ? 'Edit Product' : 'Add Product'}
        open={isModalVisible}
        onCancel={() => {
          setIsModalVisible(false);
          setEditingProduct(null);
          form.resetFields();
        }}
        onOk={() => form.submit()}
        okText={editingProduct ? 'Update' : 'Add'}
      >
        <Form form={form} layout="vertical" onFinish={addOrUpdateProduct}>
          <Form.Item name="name" label="Product Name" rules={[{ required: true }]}>
            <Input placeholder="Name" />
          </Form.Item>
          <Form.Item name="price" label="Price" rules={[{ required: true }]}>
            <InputNumber style={{ width: '100%' }} min={0} />
          </Form.Item>
          <Form.Item name="category" label="Category" rules={[{ required: true }]}>
            <Select placeholder="Category">
              <Option value="electronics">Electronics</Option>
              <Option value="clothing">Clothing</Option>
              <Option value="food">Food</Option>
              <Option value="books">Books</Option>
            </Select>
          </Form.Item>
          <Form.Item name="stock" label="Stock" rules={[{ required: true }]}>
            <InputNumber style={{ width: '100%' }} min={0} />
          </Form.Item>
          <Form.Item name="description" label="Description">
            <Input.TextArea rows={3} />
          </Form.Item>
        </Form>
      </Modal>
    </Layout>
  );
};

export default AdminDashboard;
