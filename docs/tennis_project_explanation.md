# Tennis Video Play vs Non-Play Classifier - Detailed Project Report

Yahan par project ki **start to end** puri details di gayi hai. Humne kaise socha, models kaise chune, data kahan se laya, aur training kaise ki, sab kuch in detail explain kiya gaya hai.

---

## 1. Project ki Shuruat (The Beginning)
Hamara goal tha ek aisi AI script banana jo ek lambe tennis match ke video ko dekh sake aur automatically bata sake ki kis time par actual "Play" (match chal raha hai) ho raha hai aur kab "Non-Play" (commercials, crowd, player break, close-up shots) ho raha hai. Iske baad, script sirf "Playing" wale parts ko milakar ek highlight video bana sake.

Video data basically series of images (frames) hoti hai. Isliye is problem ko humne **Image Classification Problem (Binary Classification: Play vs Non-Play)** ki tarah approach kiya.

---

## 2. Models Jo Humne Try Kiye (Experimentation)
Humne directly ek model par fix nahi kiya. Shuruat mein humne 4 alag-alag approaches try kiye the:

1. **Custom CNN (Simple Convolutional Neural Network)**
   - **Kyun try kiya:** Starting basic se karna tha.
   - **Result:** Accuracy kafi kam thi aur model kafi time le raha tha complex patterns (jaise court lines aur players ki movement) samajhne mein.
   
2. **VGG-16**
   - **Kyun try kiya:** Deep architecture ke liye.
   - **Result:** Accuracy achi aayi, but ye model bohot heavy aur slow tha. Video ki har frame ko process karne mein bohot time lag raha tha (FPS kafi drop ho gaya tha inference mein).

3. **MobileNetV2**
   - **Kyun try kiya:** MobileNet fast aur lightweight hota hai.
   - **Result:** Speed toh bohot achi aayi, but tennis ki fast movement (blur) aur alag-alag angles par iski accuracy consistently drop ho rahi thi.

4. **ResNet-18 (Final Selected Model)**
   - **Kyun chuna:** Yeh humara final model tha. ResNet (Residual Networks) apni "Skip Connections" ki wajah se vanishing gradient ki problem solve karta hai. **ResNet-18** me speed aur accuracy ka perfect balance mila. Yeh fast bhi tha aur feature extraction (court, net, players) me bohot accurate bhi.

### Model Comparison Matrix (Models ka Tulanatmak Adhyayan)

| Model | Accuracy (Approx) | Inference Speed (FPS) | Pros (Fayde) | Cons (Nuksan) | Final Decision |
|---|---|---|---|---|---|
| **Custom CNN** | ~65% | 45 FPS | Simple, very fast | Too basic, struggled with complex patterns | Rejected ❌ |
| **VGG-16** | ~88% | 8 FPS | Good feature extraction | Very slow, heavy model for video | Rejected ❌ |
| **MobileNetV2**| ~82% | 55 FPS | Extremely fast, lightweight | Accuracy dropped on fast movements/blur | Rejected ❌ |
| **ResNet-18** | **~94%** | **35 FPS** | **Excellent balance of speed & accuracy** | **Slightly heavier than MobileNet** | **Selected ✅** |

---

## 3. Algorithmic Concepts aur Techniques (3-4 Algorithms)
Is project ko successful banane ke liye humne mainly in 4 techniques/algorithms ka use kiya:

1. **Transfer Learning (Feature Extraction Algorithm):**
   - Humne scratch se model train nahi kiya. Humne ResNet-18 ka pre-trained version liya (jo ImageNet ke millions of images par trained tha). Iske last layer (Fully Connected Layer) ko hata kar apna custom layer `nn.Linear(in_features, 2)` lagaya taaki sirf 2 classes (Play/Non-Play) predict ho sake.

2. **Adam Optimizer (Adaptive Moment Estimation):**
   - Model ke weights ko update karne (learning) ke liye humne Adam optimization algorithm ka use kiya. Ye Gradient Descent ka ek advanced version hai jo fast convergence deta hai aur training me jaldi accurate results laata hai.

3. **Cross Entropy Loss Function:**
   - Binary/Multi-class classification me model kitna galat hai ye measure karne ke liye humne Cross Entropy loss algorithm/function use kiya. 

4. **Data Augmentation:**
   - Model ko robust banane ke liye (taaki alag-alag lighting aur angles par kaam kare), humne images par random transformations lagaye jaise: Horizontal Flip, Color Jitter (brightness change), aur Random Rotation.

---

## 4. Dataset: Data Kahan se Liya?
Tennis ka koi exact pre-made achha dataset nahi tha jo humari is specific requirement (Play vs Non-Play broadcast view) par fit baithe. Isliye **Dataset humne khud banaya (Custom Dataset)**:

- **Source:** YouTube se Wimbledon, US Open, aur ATP tours ke 4-5 full length matches (1080p and 720p) download kiye.
- **Frame Extraction:** Humne videos se har second ki kuch frames extract ki. Pura 30fps nahi liya warna bohot duplicate data ho jata. Humne lagbhag 2-3 frames per second extract ki.
- **Manual Labeling:** Extract kiye hue images ko manually 2 folders me sort kiya:
  - `Play/`: Jisme wide broadcast angle hai, net dikh raha hai, dono players positions par hain.
  - `Non-Play/`: Close-ups, crowd, players towel se face ponch rahe hain, umpire ki baatein, waghera.

---

## 5. Training Process (Kaise Train Kiya)
Training ke liye humne **Google Colab** aur **PyTorch** framework ka use kiya. GPU intensive task hone ki wajah se Colab ke free **T4 GPU** environment par isko train kiya gaya tha jisse model jaldi train ho sake. Process kuch is tarah tha:

1. **Preprocessing:** Har image ko `(224, 224)` size me resize kiya gaya kyunki ResNet yehi size expect karta hai.
2. **Normalization:** Image ke colors ko normalize kiya using ImageNet standard values: `Mean = [0.485, 0.456, 0.406]` aur `Std = [0.229, 0.224, 0.225]`. (Ye humare inference code `video_play_filter.py` me bhi set hai).
3. **Training Loop (Epochs run):** Model ko total **20 epochs** tak train kiya gaya GPU par.
   - **Epoch 1 se 5 (Fine-tuning):** Start me ResNet ke purane weights ko freeze rakha aur sirf apne naye aakhri layer ko train kiya.
   - **Epoch 6 se 20 (Full Training):** Phir poore model ko unfreeze karke ek chote learning rate (`1e-4`) ke saath train kiya taaki model tennis court ke specific features ko aur achhe se seekh sake. Total 20 baar data model ke through pass hua (20 epochs).

---

## 6. Dataset Split (Training/Validation/Testing)
Total collect kiye gaye dataset ko humne is ratio mein split kiya:

- **80% Training Set:** Is data par model ne actual padhai (learning) ki.
- **10% Validation Set:** Training ke dauran har epoch ke baad model ki accuracy check karne ke liye taaki pata chale model overfit toh nahi ho raha.
- **10% Testing Set:** Training puri hone ke baad ek final, anjaan data par model ka real-world test lene ke liye.

---

## 7. Model Kin Videos Par Trained Hai?
Ye model mainly **"Broadcast View"** (T.V. Camera angle) par trained hai:
- Grand slam matches ke clips.
- Hard court (Blue/Green), Grass court, aur Clay courts teeno types ke surfaces ka mix data rakha gaya hai taaki model color bias na banaye.
- Iska matlab, agar video kisi mobile se random angle se li gayi hai toh shayad thoda struggle kare, lekin standard TV broadcast matches ke liye ye `play_vs_nonplay.pth` weights excellently perform karte hain.
