import { PNG } from "pngjs";

// caculate average image color
export async function calcAvgImgColor(image: ArrayBuffer | string) {
    return new Promise(async (res, rej) => {
        try {
            const img =
                typeof image === "string" ? await fetch(image).then(v => v.arrayBuffer()) : image;
            const png = new PNG({ filterType: 4 });
            png.parse(Buffer.from(img), (err, { data }) => {
                if (err) rej(err);

                let count = 0;
                let r = 0;
                let g = 0;
                let b = 0;

                const pixelCount = data.length >> 2;
                for (let id = 0; id < pixelCount; id++) {
                    const idx = id << 2;
                    if (data[idx + 3] > 0) {
                        count++;
                        r += data[idx];
                        g += data[idx + 1];
                        b += data[idx + 2];
                    }
                }

                res(count ? ((r / count) << 16) + ((g / count) << 8) + ((b / count) << 0) : 0);
            });
        } catch (error) {
            rej(0);
        }
    });
}
