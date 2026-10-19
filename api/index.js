const express = require('express');
const app = express();

app.use(express.json()); 

app.get('/hello',(req, res) => {
    res.json({message: 'สวัสดี Back-End!'});
});



const members = [
    { id: 1, name: 'นายชยพล ไกรสีห์', role: 'API Coding' },
    { id: 2, name: 'นายกฤตพรต วงษ์แหลมสิงห์', role: 'ฐานข้อมูล ทดสอบและเอกสาร' },
];

const project = {
    team: 'ITFix',
    topic: 'แจ้งซ่อมอุปกรณ์ IT',
    problem: 'นักศึกษา เจอคอมพิวเตอร์ พัง บ่อยครั้ง',
    users: ['ผู้ใช้งาน', 'เจ้าหน้าที่', 'ผู้ดูแลระบบ'],
    members: members,
};

const ideas = {
    device: 'Computer',
    problem: 'วินโดว์หาย',
    reporter: 'สมคิด จันทร์',
    address: 'ตึก A ห้อง 603',
    status: 'รอซ่อม'
};

app.get('/project', (req, res) => {
    res.json(project);
});

app.get('/ideas', (req, res) => {
    res.json(ideas);
});

app.get('/members/:id', (req, res) => {
    const id = Number(req.params.id);                  // /members/2 ได้ id = 2
    const member = members.find((m) => m.id === id);   // หาสมาชิกที่ id ตรงกัน
    if (!member) {                                     // ถ้าหาไม่พบ
        return res.status(404).json({ message: 'ไม่พบ ID สมาชิกที่ระบุ' });
    }
    res.json(member);
});

let repairs = [
  { id: 1, reporter : 'สมคิด จันทร์', title: 'คอมพิวเตอร์ใช้งานไม่ได้', location: 'อาคาร A ห้อง 603', status: 'กำลังดำเนินการ' },
  { id: 2, reporter : 'นิรันดร์ แสงสว่าง', title: 'โปรเจกเตอร์ไม่ติด', location: 'อาคาร A ห้อง 602', status: 'เสร็จสิ้น' },
];
let nextId = 4;

app.get('/repairs', (req, res) => {
  const { status } = req.query;
  if (status) {
    return res.json(repairs.filter((r) => r.status === status));
  }
  res.json(repairs);
});

app.get('/repairs/:id', (req, res) => {
  const id = Number(req.params.id);
  const repair = repairs.find((r) => r.id === id);
  if (!repair) {
    return res.status(404).json({ message: 'ไม่พบรายการแจ้งซ่อม' });
  }
  res.json(repair);
});

app.post('/repairs', (req, res) => {
  const { reporter, title, location } = req.body;
  if (!reporter || !title || !location) {
    return res.status(400).json({ message: 'ต้องส่ง reporter, title และ location' });
  }
  const repair = { id: nextId++, reporter, title, location, status: 'กำลังดำเนินการ' };
  repairs.push(repair);
  res.status(201).json(repair);
});

app.put('/repairs/:id', (req, res) => {
  const id = Number(req.params.id);
  const repair = repairs.find((r) => r.id === id);
  if (!repair) {
    return res.status(404).json({ message: 'ไม่พบรายการแจ้งซ่อม' });
  }
  const allowed = ['กำลังดำเนินการ', 'ไม่สามารถซ่อมได้', 'เสร็จสิ้น'];
  if (req.body.status && !allowed.includes(req.body.status)) {
    return res.status(400).json({ message: 'status ต้องเป็น กำลังดำเนินการ, ไม่สามารถซ่อมได้ หรือ เสร็จสิ้น' });
  }
  repair.reporter = req.body.reporter ?? repair.reporter;
  repair.title = req.body.title ?? repair.title;
  repair.location = req.body.location ?? repair.location;
  repair.status = req.body.status ?? repair.status;
  res.json(repair);
});

app.delete('/repairs/:id', (req, res) => {
  const id = Number(req.params.id);
  const index = repairs.findIndex((r) => r.id === id);
  if (index === -1) {
    return res.status(404).json({ message: 'ไม่พบรายการแจ้งซ่อม' });
  }
  repairs.splice(index, 1);
  res.status(204).send();
});
 
// ไม่ตรงกับ route ใดเลย
app.use((req, res) => {
  res.status(404).json({ message: `ไม่มี ${req.method} ${req.path} ในระบบ` });
});

app.listen(3000,() => {
    console.log('Server is running on http://localhost:3000')
});