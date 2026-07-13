import fs from 'fs';
import path from 'path';
import { products } from '@/lib/site-data';
import { ImageCard } from './ImageCard';

export default async function MapImagesPage() {
  const baseDir = path.join(process.cwd(), 'public', 'images', 'products');
  const pdfs = ['devam-price-list', 'king-roar-price-list', 'king-roar-clamps-price-list'];
  
  const allImages: string[] = [];

  pdfs.forEach(pdf => {
    const dir = path.join(baseDir, pdf);
    if (fs.existsSync(dir)) {
      const files = fs.readdirSync(dir);
      files.forEach(file => {
        const stats = fs.statSync(path.join(dir, file));
        // Only include PNG files larger than 2KB to capture smaller product images
        if (stats.size > 2000 && file.endsWith('.png')) {
          allImages.push(`/images/products/${pdf}/${file}`);
        }
      });
    }
  });

  return (
    <div className="container-page py-24 min-h-screen bg-surface">
      <div className="max-w-4xl mx-auto mb-12">
        <h1 className="text-4xl font-bold mb-4">Image Mapper UI</h1>
        <p className="text-muted-foreground text-lg">
          Since the AI couldn't visually see the images to assign them correctly, you can do it here! 
          Below are the raw images extracted from the PDFs. For each image that represents a product, simply select the correct product from the dropdown. 
          It will instantly copy it and assign it to the product.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {allImages.map((imgPath) => (
          <ImageCard key={imgPath} imgPath={imgPath} products={products} />
        ))}
      </div>
    </div>
  );
}
