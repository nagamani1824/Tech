// import React, { useState } from 'react';


// const AdminProfile = () => {
//   const [admins, setAdmins] = useState([]);
//   const [newAdmin, setNewAdmin] = useState({ name: '', email: '', password: '' });
//   const [editingAdminId, setEditingAdminId] = useState(null);
//   const [showForm, setShowForm] = useState(false); 

//   const handleChange = (e) => {
//     setNewAdmin({ ...newAdmin, [e.target.name]: e.target.value });
//   };

//   const handleAddAdmin = () => {
//     if (!newAdmin.name || !newAdmin.email || !newAdmin.password) {
//       alert('All fields are required');
//       return;
//     }

//     const newEntry = {
//       id: Date.now(),
//       ...newAdmin,
//     };

//     setAdmins([...admins, newEntry]);
//     setNewAdmin({ name: '', email: '', password: '' });
//     setShowForm(false);
//   };

//   const handleEdit = (admin) => {
//     setNewAdmin(admin);
//     setEditingAdminId(admin.id);
//     setShowForm(true);
//   };

//   const handleUpdateAdmin = () => {
//     setAdmins(admins.map((admin) =>
//       admin.id === editingAdminId ? { ...admin, ...newAdmin } : admin
//     ));
//     setEditingAdminId(null);
//     setNewAdmin({ name: '', email: '', password: '' });
//     setShowForm(false);
//   };

//   const handleDelete = (id) => {
//     setAdmins(admins.filter((admin) => admin.id !== id));
//   };

//   return (
//     <div className="container mt-4 ">
//       {/* <h2>Admin Profile</h2> */}
//       <p>Manage admin users here.</p>

//       <button className="btn btn-primary mb-3" onClick={() => setShowForm(!showForm)}>
//         {showForm ? 'Cancel' : 'Add Admin'}
//       </button>

//       {showForm && (
//         <div className="card mb-4 ">
//           <div className="card-body ">
//             <h5 className="card-title">{editingAdminId ? 'Edit Admin' : 'Add New Admin'}</h5>
//             <div className="mb-3">
//               <input
//                 type="text"
//                 name="name"
//                 className="form-control mb-2"
//                 placeholder="Name"
//                 value={newAdmin.name}
//                 onChange={handleChange}
//               />
//               <input
//                 type="email"
//                 name="email"
//                 className="form-control mb-2"
//                 placeholder="Email"
//                 value={newAdmin.email}
//                 onChange={handleChange}
//               />
//               <input
//                 type="password"
//                 name="password"
//                 className="form-control mb-2"
//                 placeholder="Password"
//                 value={newAdmin.password}
//                 onChange={handleChange}
//               />
//               {editingAdminId ? (
//                 <button className="btn btn-success" onClick={handleUpdateAdmin}>
//                   Update Admin
//                 </button>
//               ) : (
//                 <button className="btn btn-success" onClick={handleAddAdmin}>
//                   Save Admin
//                 </button>
//               )}
//             </div>
//           </div>
//         </div>
//       )}

//       <table className="table table-bordered table-striped " style={{width: "100%"}}>
//         <thead className="table-light ">
//           <tr>
//             <th>Name</th>
//             <th>Email</th>
//             <th>Password</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {admins.map((admin) => (
//             <tr key={admin.id}>
//               <td>{admin.name}</td>
//               <td>{admin.email}</td>
//               <td>{admin.password}</td>
//               <td>
//                 <button className="btn btn-sm btn-primary me-2" onClick={() => handleEdit(admin)}>Edit</button>
//                 <button className="btn btn-sm btn-danger" onClick={() => handleDelete(admin.id)}>Delete</button>
//               </td>
//             </tr>
//           ))}
//           {admins.length === 0 && (
//             <tr>
//               <td colSpan="4" className="text-center">No admins available.</td>
//             </tr>
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default AdminProfile;






// import React, { useState, useEffect } from 'react';
// import './Admin.css';

// // Tab options
// const tabOptions = [
//   'Laptops',
//   'Accessories & Software',
//   'Gaming',
//   'Business',
//   'Tablets',
//   'Monitors',
// ];

// // Reusable CRUD component
// const EntityManager = ({ entityName, storageKey }) => {
//   const [items, setItems] = useState([]);
//   const [newItem, setNewItem] = useState({ name: '', email: '', password: '' });
//   const [editingId, setEditingId] = useState(null);
//   const [showForm, setShowForm] = useState(false);

//   // Load from localStorage
//   useEffect(() => {
//     const saved = localStorage.getItem(storageKey);
//     if (saved) {
//       setItems(JSON.parse(saved));
//     }
//   }, [storageKey]);

//   // Save to localStorage
//   useEffect(() => {
//     localStorage.setItem(storageKey, JSON.stringify(items));
//   }, [items, storageKey]);

//   const handleChange = (e) => {
//     setNewItem({ ...newItem, [e.target.name]: e.target.value });
//   };

//   const handleAdd = () => {
//     if (!newItem.name || !newItem.email || !newItem.password) {
//       alert('All fields are required');
//       return;
//     }

//     const newEntry = {
//       id: Date.now(),
//       ...newItem,
//     };

//     setItems([...items, newEntry]);
//     setNewItem({ name: '', email: '', password: '' });
//     setShowForm(false);
//   };

//   const handleEdit = (item) => {
//     setNewItem(item);
//     setEditingId(item.id);
//     setShowForm(true);
//   };

//   const handleUpdate = () => {
//     setItems(
//       items.map((item) =>
//         item.id === editingId ? { ...item, ...newItem } : item
//       )
//     );
//     setEditingId(null);
//     setNewItem({ name: '', email: '', password: '' });
//     setShowForm(false);
//   };

//   const handleDelete = (id) => {
//     setItems(items.filter((item) => item.id !== id));
//   };

//   return (
//     <div>
//       <p>Manage {entityName.toLowerCase()} here.</p>

//       <button className="btn btn-primary mb-3" onClick={() => setShowForm(!showForm)}>
//         {showForm ? 'Cancel' : `Add ${entityName}`}
//       </button>

//       {showForm && (
//         <div className="card mb-4">
//           <div className="card-body">
//             <h5 className="card-title">{editingId ? `Edit ${entityName}` : `Add New ${entityName}`}</h5>
//             <input
//               type="text"
//               name="name"
//               className="form-control mb-2"
//               placeholder="Name"
//               value={newItem.name}
//               onChange={handleChange}
//             />
//             <input
//               type="email"
//               name="email"
//               className="form-control mb-2"
//               placeholder="Email"
//               value={newItem.email}
//               onChange={handleChange}
//             />
//             <input
//               type="password"
//               name="password"
//               className="form-control mb-3"
//               placeholder="Password"
//               value={newItem.password}
//               onChange={handleChange}
//             />
//             {editingId ? (
//               <button className="btn btn-success" onClick={handleUpdate}>
//                 Update {entityName}
//               </button>
//             ) : (
//               <button className="btn btn-success" onClick={handleAdd}>
//                 Save {entityName}
//               </button>
//             )}
//           </div>
//         </div>
//       )}

//       <div className="table-responsive">
//         <table className="table table-bordered table-striped">
//           <thead className="table-light">
//             <tr>
//               <th>Name</th>
//               <th>Email</th>
//               <th>Password</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {items.map((item) => (
//               <tr key={item.id}>
//                 <td>{item.name}</td>
//                 <td>{item.email}</td>
//                 <td>{'*'.repeat(item.password.length)}</td>
//                 <td>
//                   <button className="btn btn-sm btn-primary me-2" onClick={() => handleEdit(item)}>
//                     Edit
//                   </button>
//                   <button className="btn btn-sm btn-danger" onClick={() => handleDelete(item.id)}>
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))}
//             {items.length === 0 && (
//               <tr>
//                 <td colSpan="4" className="text-center">
//                   No {entityName.toLowerCase()} available.
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// // Placeholder for unimplemented tabs
// const Placeholder = ({ name }) => (
//   <div className="alert alert-info">
//     {name} management functionality coming soon.
//   </div>
// );

// // Main Admin component
// const Admin = () => {
//   const [activeTab, setActiveTab] = useState('Laptops');

//   const renderTabContent = () => {
//     switch (activeTab) {
//       case 'Laptops':
//         return <EntityManager entityName="Admin" storageKey="admins" />;
//       case 'Monitors':
//         return <EntityManager entityName="Monitor" storageKey="monitors" />;
//       case 'Accessories & Software':
//         return <EntityManager entityName="Accessory" storageKey="accessories" />;
//       case 'Gaming':
//         return <EntityManager entityName="Gaming" storageKey="gaming" />;
//       case 'Business':
//         return <EntityManager entityName="Monitor" storageKey="monitors" />;

//       case 'Tablets':
//         return <EntityManager entityName="Tablet" storageKey="tablets" />;
//       default:
//         return null;
//     }
//   };

//   return (
//     <div className="container-fluid">
//       <div className="row">
//         {/* Sidebar */}
//         <div className="col-12 col-md-3 col-lg-2 bg-primary text-white min-vh-100 p-3">
//           <h1 className="text-info fs-4">Dashboard</h1>
//           <hr className="bg-light" />
//           <h6 className="text-muted">Interface</h6>
//           <ul className="list-group list-group-flush">
//             {tabOptions.map((tab) => (
//               <li
//                 key={tab}
//                 className={`list-group-item list-group-item-action ${
//                   activeTab === tab ? 'active' : ''
//                 }`}
//                 onClick={() => setActiveTab(tab)}
//                 style={{ cursor: 'pointer' }}
//               >
//                 {tab}
//               </li>
//             ))}
//           </ul>
//         </div>

//         {/* Main Content */}
//         <div className="col-12 col-md-9 col-lg-10 p-5">
//           <input className="form-control-lg mb-4" type="search" placeholder="Search..." />
//           <h2>{activeTab}</h2>
//           {renderTabContent()}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Admin;


