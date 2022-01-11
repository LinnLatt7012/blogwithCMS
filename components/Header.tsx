import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { getCategories } from '../services';
type Category = {
    name:String,
    slug:String
}
// const categories:Category[] = [
//     {name:"React", slug:"react"},
//     {name:"Tailwind",slug:'tailwind'},
//     {name:"Web Devlopment",slug:'web-dev'},
// ]  
const Header = () => {
    const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    getCategories().then((newCategories) => {
      setCategories(newCategories);
    });
  }, []);
    return (
        <div className="container mx-auto px-10 mb-8">
            <div className='border-b w-full inline-block border-blue-400 py-8'>
                <div className='md:float-left block'>
                    <Link href='/'>
                        <span className='cursor-pointer font-bold text-4xl text-white'>
                            GraphCMS
                        </span>
                        
                    </Link>
                </div>
                <div className="hidden md:float-lef md:contents">
                    {
                        categories.map((category)=>(
                            <Link key={category.slug} href={`/category/${category.slug}`}>
                                <span className='
                                md:float-right mt-2 algin-middle text-white ml-4 
                                font-semibold cursor-pointer'>
                                    {category.name}
                                </span>
                            </Link>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default Header
