const express = require('express');
const app = express();

app.get('/hello',(req, res) => {
    res.json({message: 'สวัสดี Back-End!'});
});

app.listen(3000,() => {
    console.log('Server is running on http://localhost:3000')
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