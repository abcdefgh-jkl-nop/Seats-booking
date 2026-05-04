const scriptURL = 'https://script.google.com/macros/s/AKfycbyJhKFDX3x8rFdbSgzIwXGaxC-5A_zuUBkCl_dx07jgoeWtp86zvfEB_jLI9OCcahkH/exec'; 
const container = document.getElementById('classroom-map');
let selectedSeat = null;

function createSeats() {
    container.innerHTML = ''; 
    let seatNum = 1;

    // สร้างทั้งหมด 4 แถวแนวนอน
    for (let r = 1; r <= 4; r++) {
        const rowDiv = document.createElement('div');
        rowDiv.style.display = 'flex';
        rowDiv.style.justifyContent = 'center';
        rowDiv.style.marginBottom = '15px';
        rowDiv.style.width = '100%';

        // ใน 1 แถว มี 4 กลุ่มหน้ากระดาน
        for (let g = 1; g <= 4; g++) {
            const groupDiv = document.createElement('div');
            groupDiv.style.display = 'flex';
            // เว้นทางเดินระหว่างกลุ่ม 40px
            groupDiv.style.marginRight = (g < 4) ? '40px' : '0'; 

            // ล็อคว่ากลุ่มที่ 1 ต้องมี 3 ที่นั่งเสมอ และกลุ่ม 2,3,4 มี 2 ที่นั่งเสมอ
            let seatsInGroup = (g === 1) ? 3 : 2;

            for (let s = 1; s <= seatsInGroup; s++) {
                const seat = document.createElement('button');
                seat.innerText = seatNum;
                seat.id = 'seat-' + seatNum;
                seat.classList.add('seat');
                seat.onclick = () => {
                    if (!seat.classList.contains('taken')) {
                        if (selectedSeat) selectedSeat.classList.remove('selected');
                        seat.classList.add('selected');
                        selectedSeat = seat;
                    }
                };
                groupDiv.appendChild(seat);
                seatNum++;
                
                // หยุดถ้าครบ 36 ที่นั่ง
                if (seatNum > 36) break;
            }
            rowDiv.appendChild(groupDiv);
        }
        container.appendChild(rowDiv);
    }
}

function loadSeats() {
    fetch(scriptURL).then(res => res.json()).then(data => {
        data.forEach(row => {
            const seatBtn = document.getElementById('seat-' + row[0]);
            if (seatBtn) {
                seatBtn.classList.add('taken');
                seatBtn.innerText = row[1];
                seatBtn.style.fontSize = '10px';
            }
        });
    });
}

function confirmBooking() {
    const name = document.getElementById('student-name').value;
    if (selectedSeat && name) {
        const seatNumber = selectedSeat.id.replace('seat-', '');
        fetch(scriptURL, { method: 'POST', body: JSON.stringify({ seat: seatNumber, name: name }) })
        .then(() => { alert('จองสำเร็จ!'); location.reload(); });
    } else { alert('กรุณาเลือกที่นั่งและใส่ชื่อครับ'); }
}

createSeats();
loadSeats();
