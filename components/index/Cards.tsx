import {FiCheckCircle} from '../../assets/icons/vander';
import {CardProps} from '../../types/types';

export default function Cards({BusinessData, developerData} : CardProps) {
	return (
		<div className="container relative md:mt-24 mt-16">
			<div className="grid lg:grid-cols-6 md:grid-cols-2 grid-cols-1 mt-6 gap-6">
				{/* Developer Card */}
				<div className="p-6 rounded-md shadow dark:shadow-gray-800 group bg-white dark:bg-slate-900 hover:bg-amber-400/5 dark:hover:bg-amber-400/5 duration-500">
					<div className="content mt-6">
						<p className="font-semibold text-xl hover:text-amber-400 flex justify-center items-center">
							Codebolt For Developers
						</p>
						<div className="mx-12 my-5">
							<ul className="list-none text-slate-400 mt-4">
								{
								developerData?.map((item, index) => (
									<li key={index}
										className="mb-2 flex items-center"><FiCheckCircle className="text-amber-400 h-5 w-5 me-2"/> {
										item.title
									} </li>

								))
							} </ul>
						</div>
					</div>
				</div>

				{/* Business Card */}
				<div className="p-6 rounded-md shadow dark:shadow-gray-800 group bg-white dark:bg-slate-900 hover:bg-amber-400/5 dark:hover:bg-amber-400/5 duration-500">
					<div className="content mt-6">
						<p className="font-semibold text-xl hover:text-amber-400 flex justify-center items-center">
							Codebolt For Businesses
						</p>
						<div className="mx-12 my-5">
							<ul className="list-none text-slate-400 mt-4">
								{
								BusinessData?.map((item, index) => (
									<li key={index}
										className="mb-2 flex items-center"><FiCheckCircle className="text-amber-400 h-5 w-5 me-2"/> {
										item.title
									} </li>
								))
							} </ul>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
